import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Container from "./container/Container";
import { useState,useEffect } from "react";
import DatabaseService from "@/Appwrite/appWriteConfig";
import { BlogCard } from ".";

function getMinutesFromUTCToLocal(utcTimestamp) {
  
  const utcDate = new Date(utcTimestamp);

  
  const localDate = new Date();

  
  const timeDifference = localDate - utcDate;


  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  return minutesDifference;
}


function getStatusWithDot(isActive) {
  if (isActive) {
    return "Active \u{1F7E2}"; 
  } else {
    return "Inactive \u{1F534}"; 
  }
}

function getUTCDateMonthYear(utcTime) {
    // Create a UTC Date object from the provided UTC time
    const utcDate = new Date(utcTime);
  
    // Extract the date, month, and year using UTC-specific methods
    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const date = String(utcDate.getUTCDate()).padStart(2, '0');
  
    // Combine the components into a single string in YYYY-MM-DD format
    return `${year}-${month}-${date}`;
  }
function Profile() {
  const userData = useSelector((state) => state?.auth?.userData);

  const accountCreatedAt = getUTCDateMonthYear(userData?.$createdAt);

  const utcTimestamp = userData?.accessedAt;
  const activeSince = getMinutesFromUTCToLocal(utcTimestamp);


  const isActive = userData?.status;
  const statusWithDot = getStatusWithDot(isActive);

  

  const [posts, setPosts] = useState([])

    useEffect(() => {
        DatabaseService.getUserPosts(userData?.$id,[]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <Container>
     <Card className="w-full h-svh/2 flex flex-col items-center gap-8 mt-16 p-6">
  <CardHeader className="text-center">
    <CardTitle className="text-3xl font-bold">User Profile</CardTitle>
    <CardDescription className="text-lg">
      Detailed information about your account
    </CardDescription>
  </CardHeader>

  <CardContent className="w-full max-w-md space-y-6">
    <ul className="space-y-4 text-xl font-semibold">
      <li className="flex justify-between">
        <span className="">Name:</span>
        <span className="">{userData?.name}</span>
      </li>
      <li className="flex justify-between">
        <span className="">Email:</span>
        <span className="">{userData?.email}</span>
      </li>
      <li className="flex justify-between">
        <span className="">Phone No:</span>
        <span className="">{userData?.phone}</span>
      </li>
    </ul>
  </CardContent>

  <CardFooter className="w-full max-w-md">
    <ul className="w-full space-y-4 text-lg font-semibold">
      <li className="flex justify-between">
        <span className="">Online Status:</span>
        <span className="">{statusWithDot}</span>
      </li>
      <li className="flex justify-between">
        <span className="">Active since:</span>
        <span className="">{activeSince} min ago</span>
      </li>
      <li className="flex justify-between">
        <span className="">Account Created on:</span>
        <span className="">{accountCreatedAt}</span>
      </li>
      <li className="flex justify-between">
        <span className="">Total no of your Posts:</span>
        <span className="">{posts.length}</span>
      </li>
    </ul>
  </CardFooter>
</Card>

      <div className='flex flex-wrap mt-4'>
                {posts.map((post) => (
                    
                   
                    <div key={post.$id} className='p-2 w-1/4'>
                        <BlogCard {...post} />
                    </div>
                    
                ))}
            </div>

    </Container>
  );
}

export default Profile;
