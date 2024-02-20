import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShimmerCircularImage } from "react-shimmer-effects";
import Container from "./container/Container";
import { useState,useEffect } from "react";
import DatabaseService from "@/Appwrite/appWriteConfig";
import { BlogCard } from ".";

function getMinutesFromUTCToLocal(utcTimestamp) {
  // Convert UTC timestamp to date object
  const utcDate = new Date(utcTimestamp);

  // Get the current local time
  const localDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = localDate - utcDate;

  // Convert milliseconds to minutes
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  return minutesDifference;
}


function getStatusWithDot(isActive) {
  if (isActive) {
    return "Active \u{1F7E2}"; // Green dot emoji
  } else {
    return "Inactive \u{1F534}"; // Red dot emoji
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
      <Card className="w-full h-svh/2 mt-4 flex flex-wrap gap-10">
        <CardHeader>
          <CardTitle>
            <ShimmerCircularImage size={200} />
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="mt-16">
          <ul className=" flex flex-col gap-y-3 text-xl font-semibold">
            <li> Name :{" " + userData?.name}</li>
            <li> Email :{" " + userData?.email}</li>
            <li>Phone No :{" " + userData?.phone}</li>
          </ul>
        </CardContent>
        <CardFooter>
          <ul className="flex flex-col gap-y-3 font-semibold">
            <li> Online Status :{" " + statusWithDot}</li>
            <li>Active since : {" " + activeSince + " "} min ago.</li>
            <li>Account Created on :{" " + accountCreatedAt}</li>
           

            <li>
              Total no of your Posts :
              {" "+posts.length}
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
