import React, { useState } from 'react'
import DropDown from '../../../utils/DropDown';
import { CiShare1 } from 'react-icons/ci';
import { BiLink, BiLogoFacebookCircle, BiLogoTwitter, BiLogoWhatsappSquare } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

const ShareJobs = () => {
    const [showDrop, setShowDrop] = useState(false);
    const path = window.location.href;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(path);
            toast.success("Se ha copiado el enlace");
            setShowDrop(false);
        } catch (error: any) {
            toast.error(error.message);
            setShowDrop(false);
        }
    };
    return (
        <div className='relative'>
            <button
                onClick={() => setShowDrop(!showDrop)}>
                <CiShare1 className='text-2xl' />
            </button>
            <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
                <Button click={copyLink} title="Copiar enlace" icon={<BiLink />} />

                <FacebookShareButton url={path}>
                    <Button click="" title="Compartir en Facebook" icon={<BiLogoFacebookCircle />} />
                </FacebookShareButton>

                <TwitterShareButton url={path}>
                    <Button click="" title="Compartir en Twitter" icon={<BiLogoTwitter />} />
                </TwitterShareButton>

                <WhatsappShareButton url={path}>
                    <Button click="" title="Compartir en Whatsapp" icon={<BiLogoWhatsappSquare />} />
                </WhatsappShareButton>
            </DropDown>
        </div>
    )
}

export default ShareJobs;

const Button = ({ click, icon, title }: any) => {
    return (
        <button
            onClick={click}
            className='p-2 hover:bg-gray-200 hover:text-black/80 w-full text-sm text-left 
        flex items-center gap-2 cursor-pointer text-gray-500'>
            <span className='text-[1.2rem]'>{icon}</span>
            {title}
        </button>
    )
}