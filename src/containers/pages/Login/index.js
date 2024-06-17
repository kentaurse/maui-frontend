import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TerraConnect from './terraConnect';

function Login() {
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/dashboard');
    }
  }, [history]);
  function handleGoBack(){
    history.push('/dashboard');
  }
  return (
    <div className='relative w-full min-h-[800px] md:min-h-[1000px] bg-login-background dark:bg-login-background-dark transition-all duration-1000'>
      {/* bg images */}
      <div className='mix-blend-luminosity dark:mix-blend-normal bg-login-leftbottom bg-center bg-cover absolute left-0 bottom-0 w-[206px] h-[201px] md:w-[412px] md:h-[402px]'></div>
      <div className='mix-blend-luminosity dark:mix-blend-normal bg-login-middletop bg-center bg-cover absolute left-0 md:left-[25%] top-0 w-[135px] h-[63px] md:w-[270px] md:h-[125px]'></div>
      <div className='mix-blend-luminosity dark:mix-blend-normal bg-login-middlemiddle bg-center bg-cover absolute left-0 md:left-[20%] top-[40%] w-[170px] h-[155px] md:w-[339px] md:h-[309px]'></div>
      <div className='mix-blend-luminosity dark:mix-blend-normal bg-login-middlebottom bg-center bg-cover absolute left-0 md:left-[30%] bottom-[10%] w-[197px] h-[185px] md:w-[393px] md:h-[370px]'></div>
      <div className='mix-blend-luminosity dark:mix-blend-normal bg-login-righttop bg-center bg-cover absolute right-[5%] top-[10%] w-[300px] h-[310px] md:w-[669px] md:h-[623px]'></div>
      <div className='mix-blend-luminosity dark:mix-blend-normal bg-login-rightbottom bg-center bg-cover absolute right-0 bottom-0 w-[300px] h-[175px] md:w-[662px] md:h-[347px]'></div>
      <span
        onClick={handleGoBack}
        className='absolute top-[40px] left-[calc(50%-160px)] md:top-[calc(50%-480px)] md:left-[calc(50%-450px)] text-[30px] cursor-pointer text-[#FFFFFF] dark:text-[#FFFFFF]'
      >&lt;</span>
      {/* card */}
      <div className='absolute w-[320px] h-[650px] left-[calc(50%-160px)] top-[90px] md:w-[900px] md:h-[750px] md:top-[calc(50%-430px)] md:left-[calc(50%-450px)] bg-[#5882C140] dark:bg-[#FFFFFF1A] backdrop-blur-[25px] border-[3px] border-[#5882C1] dark:border-[#FFFFFFB0] rounded-[40px] p-[20px] text-center'>
        <div
          className='bg-splash-logo dark:bg-splash-logo-dark bg-center bg-cover w-[120px] h-[40px] transition-all duration-1000 cursor-pointer'
          onClick={handleGoBack}
        />
        <div className='mt-[40px] md:mt-[70px] text-[14px] leading-[21px] md:text-[28px] md:leading-[42px] text-[#FFFFFF] font-semibold text-center tracking-[4px] login-text-shadow'>
          We offer <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Revolutionary Banking</span><br />services based on blockchain.
        </div>
        <div className="mt-[50px] tracking-[1px] text-[12px] md:text-[24px] text-[#FFFFFF] dark:text-[#C9C0C0] font-semibold text-center">
          Please access your account on blockchain
        </div>
        <TerraConnect
          className="mt-[15px] md:mt-[30px] rounded-[25px] md:rounded-[50px] border-2 border-[#0C3E9F] dark:border-[#1199FA] w-[60%] h-[50px] bg-[#FFFFFF] dark:bg-[#4D4360]"
          label={<span className='font-semibold text-[14px] leading-[16px] md:text-[20px] md:leading-[24px] tracking-[1px] text-[#0C3E9F] dark:text-[#1199FA] transition-all duration-1000'>My Account</span>}
        />
        <div className="mt-[10px] md:mt-[20px] text-[12px] md:text-[14px] text-center text-[#FFFFFF]">OR</div>
        <div className="mt-[10px] md:mt-[20px] text-[12px] md:text-[14px] text-center text-[#FFFFFF]">Don’t have an account yet?</div>
        <TerraConnect
          className="mt-[15px] md:mt-[30px] rounded-[25px] md:rounded-[50px] border-2 border-[#003465] dark:border-[#1199FA] w-[60%] h-[50px] bg-[#003465] dark:bg-[#1199FA]"
          label={<span className='font-semibold text-[14px] leading-[16px] md:text-[20px] md:leading-[24px] tracking-[1px] text-[#FFFFFF] dark:text-[#FFFFFF] transition-all duration-1000'>New Account</span>}
        />
        <div className='mt-[20px] text-[12px] md:text-[14px] text-center text-[#FFFFFF]'>
          <p>For new Accounts: </p>
          <br/>
          <p>1. Open Chrome browser</p>
          <p>2. Open <a rel="noreferrer" href='http://station.terra.money' target='_blank' className='underline cursor-pointer'>http://station.terra.money</a></p>
          <p>3. Connect to the Terra Station extension</p>
          <p>4. Sign transactions</p>
        </div>
      </div>
    </div>
  )
}

export default Login;