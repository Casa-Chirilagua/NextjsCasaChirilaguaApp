import Image from "next/image"
import LogoLoading from '@/public/casa-logo-loading.svg';


const loading = () => {
    return (
        <div className='spinner-container'>
        <div className='spinner'></div>
        <Image className="logo-loading" src={LogoLoading} alt="logo" height={100} width={100} />
      </div>
    )
}

export default loading