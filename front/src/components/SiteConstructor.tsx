import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSite, updateSite } from '../services/server';
import SectionEditor from './SectionEditor';
import Preview from './Preview';

const SiteConstructor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (id) {
            getSite(parseInt(id), token || '')
                .then(response => {
                    const siteData = response;
                    // const updatedData = {
                    //     header: {
                    //         visible: siteData.header?.visible || false,
                    //         logo: siteData.header?.logo || null,
                    //         menu: siteData.header?.menu || [{ link: '', text: '' }]
                    //     },
                    //     slider: siteData.slider || { visible: false, images: [] },
                    //     services: siteData.services || { visible: false, cols: [] },
                    //     info: siteData.info || { visible: false, image: null, title: '', text: '' },
                    //     socials: siteData.socials || { visible: false, instagram: '', facebook: '', youtube: '' },
                    //     footer: siteData.footer || { visible: false, work_time: '', web_link: '' },
                    //     site: siteData.site || {}
                    // };
                    setData(siteData);
                })
                .catch(error => {
                    console.error('Error fetching site data:', error);
                });
        }
    }, [id]);

    const handleSave = () => {
        const token = localStorage.getItem('token');
        if (id && data) {
            updateSite(parseInt(id), data, token || '')
                .then(() => {
                    alert('Site updated successfully!');
                    navigate('/sites');
                })
                .catch(error => {
                    console.error('Error updating site:', error);
                    alert('Failed to update site');
                });
        }
    };

    const handleInputChange = (section: string, field: string, value: any) => {
        if (data) {
            const newData = { ...data };
            newData[section][field] = value;
            setData(newData);
        }
    };

    const visibleHandler = (name: string, e: any) => {
        if (data) {
            const newData = { ...data };
            if (newData[name]) {
                newData[name].visible = e.target.checked;
                setData(newData);
            }
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex'>
            <div className=' w-[500px] h-[100vh] p-4 overflow-y-scroll'>
                <SectionEditor
                    title="Header"
                    sectionName="header"
                    data={data}
                    visibleHandler={visibleHandler}
                    handleInputChange={handleInputChange}
                />
                <SectionEditor
                    title="Slider"
                    sectionName="slider"
                    data={data}
                    visibleHandler={visibleHandler}
                    handleInputChange={handleInputChange}
                />
                <SectionEditor
                    title="Services"
                    sectionName="services"
                    data={data}
                    visibleHandler={visibleHandler}
                    handleInputChange={handleInputChange}
                />
                <SectionEditor
                    title="Info"
                    sectionName="info"
                    data={data}
                    visibleHandler={visibleHandler}
                    handleInputChange={handleInputChange}
                />
                <SectionEditor
                    title="Socials"
                    sectionName="socials"
                    data={data}
                    visibleHandler={visibleHandler}
                    handleInputChange={handleInputChange}
                />
                <SectionEditor
                    title="Footer"
                    sectionName="footer"
                    data={data}
                    visibleHandler={visibleHandler}
                    handleInputChange={handleInputChange}
                />
                <button
                    onClick={handleSave}
                    className="mt-6 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
                >
                    Save Changes
                </button>
            </div>
            <Preview data={data} />
        </div>
    );
};

export default SiteConstructor;

