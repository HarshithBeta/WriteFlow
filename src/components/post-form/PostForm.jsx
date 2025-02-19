import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",  
      content: post?.content || "",
      status: post?.status || "active",
    }
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => {
    return state.auth?.userData;
  });

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return ''; 
  }, []);

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug:slugTransform(post.title) || "",  
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const slug = slugTransform(value.title);
        setValue("slug", slug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const submit = async (data) => {
    try {
      if (!userData || !userData.$id) {
        console.error("User data is missing or invalid.");
        return;
      }

      let fileId = null;
      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          fileId = file.$id;  
        } else {
          console.error("File upload failed.");
        }
      }

      const postData = {
        ...data,
        featuredImage: fileId || post?.featuredImage,  
        userId: userData.$id,  
      };

      if (post) {
        const dbPost = await appwriteService.updatePost(post.$id, postData);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const dbPost = await appwriteService.createPost(postData);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Error during submit:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      {/* Left side of the form */}
      <div className='w-2/3 px-2'>
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right side of the form */}
      <div className='w-1/3 px-2'>
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {
          post && (
            <div className='w-full mb-4'>
              <img src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className='rounded-lg'
              />
            </div>
          )
        }
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-6"
          {...register("status", { required: true })}
        />
        <Button
          type='submit'
          bgColor={post ? "bg-green-500" : undefined}
          className='w-full mt-6'
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
