import React from "react";
/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
//import { Select } from "../ui/select";
import { Label } from "../ui/label";
import { Rte } from "..";
import DatabaseService from "@/Appwrite/appWriteConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  //console.log(post);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);

  
  const submit = async (data) => {
   // console.log(data);
    
    if (post) {
      const File = data.image[0]
        ? DatabaseService.uploadFile(data.image[0])
        : null;

      if (File) {
        DatabaseService.deleteFile(post.imageId);
      }

      const dbPost = await DatabaseService.updatepost(post.$id, {
        ...data,
        postImage: File ? data.postImage : null,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await DatabaseService.uploadFile(data.image[0]);
      //console.log(file+" uploaded");
      if (file) {
        const fileId = file.$id;
                data.imageId = fileId;
        
        const dbPost = await DatabaseService.createPost({
          ...data,
          userId: userData.$id
        });
        

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  
/*   const submit = async (data) => {
    try {
        if (userData && userData.$id) {
            if (post) {
                const File = data.image[0] ? await DatabaseService.uploadFile(data.image[0]) : null;
                if (File) {
                    await DatabaseService.deleteFile(post.postImage);
                }
                const dbPost = await DatabaseService.updatepost(post.$id, {
                    ...data,
                    postImage: File ? File.$id : null,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await DatabaseService.uploadFile(data.image[0]);
                console.log(file + " uploaded");
                if (file) {
                    const fileId = file.$id;
                    data.postImage = fileId;
                    const dbPost = await DatabaseService.createPost({
                        ...data,
                        userId: userData.$id,
                    });
                    console.log({...data});
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } else {
            console.error("userData is undefined or missing $id property");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};
 */
  
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Label htmlFor="">
          Title :
        </Label>
        <Input
          
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Label htmlFor="">
          Slug :
        </Label>
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Rte
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
      <Label htmlFor="">
          Image :
        </Label>
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={DatabaseService.getFilePreview(post.imageId)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
       {/*  <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        /> */}
        <Button
          type="submit"
          /* bgColor={post ? "bg-green-500" : undefined} */
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
