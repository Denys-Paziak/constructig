import React from 'react';

interface InfoProps {
    image: string | null; // URL зображення
    title: string;        // Заголовок
    text: string;         // Текст
}

export const Info: React.FC<InfoProps> = ({ image, title, text }) => {
    return (
        <div className="bg-white py-12 flex gap-4">
            <div className="container mx-auto ">
                {image ? (
                    <div className='flex items-center gap-6'>
                        <img
                            src={image}
                            alt={title}
                            className="h-[50vh] w-[50%] object-cover mb-4 rounded-lg"
                        />
                        <div className='w-[50%]'>
                            <h3 className="text-4xl font-semibold text-gray-800">{title}</h3>
                            <p className="text-gray-600 mt-4">{text}</p>
                        </div>
                    </div>
                ) : <>
                    <div className='w-[100%] text-center'>
                        <h3 className="text-4xl font-semibold text-gray-800">{title}</h3>
                        <p className="text-gray-600 mt-4">{text}</p>
                    </div>
                </>}

            </div>
        </div>
    );
};

export default Info;
