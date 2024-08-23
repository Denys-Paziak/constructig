import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createCategory } from "../../../../../../../services/categories/category";
import { AdminImage } from "../../../../../../../utils/dropzone/dropzone";

interface Props {
  toggleCategoriesForm: () => void;
  getAll: () => void;
}

interface FormValues {
  category: string;
}

const UserCabinetCategoryForm: React.FC<Props> = ({
  toggleCategoriesForm,
  getAll,
}) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const acceptType: Accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  };

  const onDropMainImage = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  }, []);

  const {
    getRootProps: getMainRootProps,
    getInputProps: getMainInputProps,
    isDragActive: isMainDragActive,
    isDragAccept: isMainDragAccept,
    isDragReject: isMainDragReject,
    isFocused: isMainFocused,
  } = useDropzone({
    onDrop: onDropMainImage,
    multiple: false,
    accept: acceptType,
  });

  //   const handleAddDescription = () => {
  //     const currentDescriptions = getValues("descriptions");
  //     const updatedDescriptions = [...currentDescriptions, ""];
  //     reset({ descriptions: updatedDescriptions });
  //   };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (mainImage) {
      formData.append("image_url", mainImage);
    }

    const token = localStorage.getItem("token");
    const notify = (message: string) => toast(message);

    if (token) {
      try {
        const response = await createCategory(formData, token);
        notify(response.message);
        getAll();
        reset();
        toggleCategoriesForm();
        setMainImagePreview(null);
      } catch (error) {
        console.error("Error creating blog:", error);
        notify("Щось пішло не так...");
      } finally {
        setIsLoading(false);
      }
    } else {
      notify("Авторизуйтеся будь ласка!");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-[20px]"
    >
      <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
        <label htmlFor="image" className="text-sm font-semibold">
          Зображення категорії
        </label>
        <AdminImage
          {...getMainRootProps({
            isdragactive: isMainDragActive.toString(),
            isdragaccept: isMainDragAccept.toString(),
            isdragreject: isMainDragReject.toString(),
            isfocused: isMainFocused.toString(),
          })}
        >
          <input {...getMainInputProps()} />
          {isMainDragActive ? (
            <p>Перетягніть сюди файли ...</p>
          ) : (
            <p>Перетягніть сюди файли</p>
          )}
        </AdminImage>
        {mainImagePreview && (
          <div className="w-12 h-12 mr-4">
            <img
              src={mainImagePreview}
              alt="banner preview"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
      {/* <div className={styles.admin__block_control}>
        <label htmlFor="blog_language" className={styles.admin__control_label}>
          Оберіть мову
        </label>
        <select
          className={styles.admin__control_field}
          {...register("blog_language", {
            required: `Це поле обов'язкове!`,
          })}
        >
          <option value="en">Англ</option>
          <option value="de">Нім</option>
          <option value="ru">Рос</option>
        </select>
      </div> */}
      <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold">
          Назва категорії
        </label>
        <input
          type="text"
          className="py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          style={errors["category"] ? { border: "1px solid #EB001B" } : {}}
          placeholder="Назва категорії"
          {...register("category", { required: `Це поле обов'язкове!` })}
        />
        {errors["category"] && (
          <span className="text-md text-red-500 font-light">
            {errors["category"]?.message as string}
          </span>
        )}
      </div>
      <div className="w-full flex md:flex-row flex-col gap-[20px] pt-4 border-t border-gray-300">
        <button
          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="submit"
          disabled={isLoading || !isValid}
        >
          {isLoading ? "Загрузка..." : "Підтвердити"}
        </button>
        <button
          onClick={toggleCategoriesForm}
          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="button"
          disabled={isLoading}
        >
          Скасувати
        </button>
      </div>
    </form>
  );
};

export default UserCabinetCategoryForm;
