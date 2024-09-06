import React, { useCallback, useEffect, useState } from "react";
import { INew } from "../../../../../../../services/news/news.interface";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Accept, useDropzone } from "react-dropzone";
import { getNewById, updateNew } from "../../../../../../../services/news/news";
import { AdminImage } from "../../../../../../../utils/dropzone/dropzone";
import { deleteImage } from "../../../../../../../services/upload-images/uploadImages";
import { notify, notifyError } from "../../../../../../../helpers/helper";

const UserCabinetNewsUpdate = () => {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreview, setNewImagesPreview] = useState<string[] | null>(
    null
  );
  const [isEditUploadOpen, setEditUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editNew, setEditNew] = useState<INew>();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const acceptType: Accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  };

  const onDropNewImages = useCallback((acceptedFiles: File[]) => {
    const files = acceptedFiles;
    setNewImages((prevNewImages) => [...prevNewImages, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setNewImagesPreview((prevPreviews) => [
      ...(prevPreviews || []),
      ...newPreviews,
    ]);
  }, []);

  const {
    getRootProps: getNewRootProps,
    getInputProps: getNewInputProps,
    isDragActive: isNewDragActive,
    isDragAccept: isNewDragAccept,
    isDragReject: isNewDragReject,
    isFocused: isNewFocused,
  } = useDropzone({
    onDrop: onDropNewImages,
    multiple: true,
    accept: acceptType,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getEditedNew = async () => {
      if (token) {
        try {
          const editedNew: INew = await getNewById(id!, token);
          setEditNew(editedNew);

          if (editedNew) {
            const updatedObject = {
              image: editedNew.image,
              title: editedNew.title,
              content: editedNew.content,
            };
            reset(updatedObject);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getEditedNew();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      if (token) {
        const response = await deleteImage(editNew!.image, token);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (newImages.length > 0) {
      newImages.forEach((file) => {
        formData.append("image", file);
      });
    }

    if (token) {
      try {
        const response = await updateNew(formData, id!, token);
        notify(response.message);
        navigate("/profile");
        reset();
      } catch (error) {
        console.log(error);
        notifyError("Something went wrong...");
      }
    }
  };

  const handleChangePhoto = () => {
    setEditUploadOpen((prevState) => !prevState);
  };

  return (
    <section className="w-full min-h-screen shape_bg pt-10 px-4 md:px-0">
      <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg">
        <div className="w-full flex flex-col gap-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-black">
            Update new data
          </h2>
          <div className="w-full flex flex-col gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-wrap gap-[20px]"
            >
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                {!isEditUploadOpen && (
                  <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                    <label htmlFor="image" className="text-sm font-semibold">
                      New image
                    </label>
                    <ul className="">
                      <li className="w-10 h-auto">
                        <img
                          className="w-full h-full"
                          src={editNew?.image}
                          alt="new preview"
                        />
                      </li>
                    </ul>
                  </div>
                )}
                <div className="w-full flex flex-col gap-3">
                  <button
                    onClick={handleChangePhoto}
                    className="w-[160px] py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="button"
                  >
                    {!isEditUploadOpen ? "Change image" : "Cancel"}
                  </button>
                  {isEditUploadOpen && (
                    <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                      <AdminImage
                        {...getNewRootProps({
                          isdragactive: isNewDragActive.toString(),
                          isdragaccept: isNewDragAccept.toString(),
                          isdragreject: isNewDragReject.toString(),
                          isfocused: isNewFocused.toString(),
                        })}
                      >
                        <input {...getNewInputProps()} />
                        {isNewDragActive ? (
                          <p>Drag and drop files here</p>
                        ) : (
                          <p>Drag and drop files here</p>
                        )}
                      </AdminImage>
                      <ul className="">
                        {newImagePreview &&
                          newImagePreview.map(
                            (newImagePreview: string, index: number) => (
                              <li key={index} className="">
                                <img
                                  className=""
                                  src={newImagePreview}
                                  alt={`category preview ${index}`}
                                />
                              </li>
                            )
                          )}
                      </ul>
                      {errors["image_url"] && (
                        <span className="text-red-500 text-sm">
                          {errors["image_url"]?.message as string}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={errors["title"] ? { border: "1px solid #EB001B" } : {}}
                  placeholder="Title"
                  {...register("title", { required: `Це поле обов'язкове!` })}
                />
                {errors["title"] && (
                  <span className="text-md text-red-500 font-light">
                    {errors["title"]?.message as string}
                  </span>
                )}
              </div>
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
                <label htmlFor="content" className="text-sm font-semibold">
                  Description
                </label>
                <input
                  type="text"
                  className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={
                    errors["content"] ? { border: "1px solid #EB001B" } : {}
                  }
                  placeholder="Description"
                  {...register("content", { required: `Це поле обов'язкове!` })}
                />
                {errors["content"] && (
                  <span className="text-md text-red-500 font-light">
                    {errors["content"]?.message as string}
                  </span>
                )}
              </div>
              <div className="w-full flex md:flex-row flex-col gap-[20px] pt-4 border-t border-gray-300">
                <button
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="submit"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? "Loading..." : "Confirm"}
                </button>
                <button
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                  onClick={() => navigate("/profile")}
                >
                  Back to profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCabinetNewsUpdate;
