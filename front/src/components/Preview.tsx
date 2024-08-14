import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { Info } from './info/Info';
import { Services } from './services/Services';
import { Slider } from './slider/Slider';
import { Socials } from './socials/Socials';

interface PreviewProps {
    data: any;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
    if (!data) return null;


    console.log(data)

    return (
        <div className='w-[100%] flex justify-center bg-gray-200 py-6'>
            <div className='w-[400px]'>
                {data.header?.visible && <Header logo={data.header.logo} data={data} company={data.site?.name || ''} />}
                {data.slider?.visible && <Slider
                    images={data.slider.images || []}
                    backgroundColor="#fff"
                />}
                {data.services?.visible && <Services services={data.services.cols || []} />}
                {data.info?.visible && (
                    <Info
                        image={data.info.image}
                        title={data.info.title}
                        text={data.info.text}
                    />
                )}
                {data.socials?.visible && (
                    <Socials socials={[
                        { icon: 'path_to_instagram_icon', link: data.socials.instagram, name: 'Instagram' },
                        { icon: 'path_to_facebook_icon', link: data.socials.facebook, name: 'Facebook' },
                        { icon: 'path_to_youtube_icon', link: data.socials.youtube, name: 'YouTube' }
                    ]} />
                )}
            </div>
        </div>
    );
};

export default Preview;
