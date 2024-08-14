interface SectionEditorProps {
    title: string;
    sectionName: string;
    data: any;
    visibleHandler: (name: string, e: any) => void;
    handleInputChange: (section: string, field: string, value: any) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ title, sectionName, data, visibleHandler, handleInputChange }) => {


    const handleSliderImageChange = (index: number, value: any) => {
        const newImages = [...data[sectionName].images];
        newImages[index] = value;
        handleInputChange(sectionName, 'images', newImages);
    };

    const addSliderImage = () => {
        const newImages = [...data[sectionName].images, ''];
        handleInputChange(sectionName, 'images', newImages);
    };

    const removeSliderImage = (index: number) => {
        const newImages = [...data[sectionName].images];
        newImages.splice(index, 1);
        handleInputChange(sectionName, 'images', newImages);
    };

    return (
        <div className='mb-6'>
            <h2 className='text-2xl font-bold mb-4'>{title}</h2>
            <form className='flex flex-col gap-4'>
                <div className='flex gap-4 items-center'>
                    <p>Відображення:</p>
                    <input
                        type="checkbox"
                        checked={data[sectionName]?.visible || false}
                        onChange={(e) => visibleHandler(sectionName, e)}
                    />
                </div>
                {sectionName === "header" && (
                    <>
                        <div className='flex flex-col gap-4'>
                            <p>Лого:</p>
                            <input
                                type="file"
                                onChange={(e) => handleInputChange(sectionName, 'logo', e.target.files ? e.target.files[0] : null)}
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>Колір:</p>
                            <p>тут буде вибір кольору:</p>
                        </div>
                    </>
                )}
                {sectionName === "slider" && (
                    <div className='flex flex-col gap-4'>
                        <p>Слайди:</p>
                        {data[sectionName]?.images?.map((image: any, index: number) => (
                            <div key={index} className='flex flex-col gap-2'>
                                <input
                                    type="text"
                                    placeholder='Посилання на зображення'
                                    value={image}
                                    onChange={(e) => handleSliderImageChange(index, e.target.value)}
                                    className='p-2 border border-gray-300 rounded-md'
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSliderImage(index)}
                                    className="mt-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Видалити
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSliderImage}
                            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Додати слайд
                        </button>
                    </div>
                )}
                {sectionName === "info" && (
                    <>
                        <div className='flex flex-col gap-4'>
                            <p>Картинка:</p>
                            <input
                                type="file"
                                onChange={(e) => handleInputChange(sectionName, 'image', e.target.files ? e.target.files[0] : null)}
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>Заголовок:</p>
                            <input
                                type="text"
                                placeholder='Заголовок'
                                value={data[sectionName]?.title || ''}
                                onChange={(e) => handleInputChange(sectionName, 'title', e.target.value)}
                                className='p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>Текст:</p>
                            <textarea
                                placeholder='Текст'
                                value={data[sectionName]?.text || ''}
                                onChange={(e) => handleInputChange(sectionName, 'text', e.target.value)}
                                className='p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                    </>
                )}
                {sectionName === "socials" && (
                    <>
                        <div className='flex flex-col gap-4'>
                            <p>Instagram:</p>
                            <input
                                type="text"
                                placeholder='Instagram'
                                value={data[sectionName]?.instagram || ''}
                                onChange={(e) => handleInputChange(sectionName, 'instagram', e.target.value)}
                                className='p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>Facebook:</p>
                            <input
                                type="text"
                                placeholder='Facebook'
                                value={data[sectionName]?.facebook || ''}
                                onChange={(e) => handleInputChange(sectionName, 'facebook', e.target.value)}
                                className='p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>YouTube:</p>
                            <input
                                type="text"
                                placeholder='YouTube'
                                value={data[sectionName]?.youtube || ''}
                                onChange={(e) => handleInputChange(sectionName, 'youtube', e.target.value)}
                                className='p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                    </>
                )}
                {sectionName === "footer" && (
                    <>
                        <div className='flex flex-col gap-4'>
                            <p>Час роботи:</p>
                            <input
                                type="text"
                                placeholder='Час роботи'
                                value={data[sectionName]?.work_time || ''}
                                onChange={(e) => handleInputChange(sectionName, 'work_time', e.target.value)}
                                className='p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>Посилання на вебсайт:</p>
                            <input
                                type="text"
                                placeholder='Посилання на вебсайт'
                                value={data[sectionName]?.web_link || ''}
                                onChange={(e) => handleInputChange(sectionName, 'web_link', e.target.value)}
                                className='p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default SectionEditor;
