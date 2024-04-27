import api from "@/libs/api";
import { SocialLogin as SocialLoginType } from "@/types/auth/social-login";
import { useState, useEffect } from "react";
import "./social-login.scss";

type SocialLogins = SocialLoginType[];

const SocialLogin = () => {
  const [socialLogins, setSocialLogins] = useState<SocialLogins>([]);

  useEffect(() => {
    api
      .get<SocialLogins>("/api/v1/client-registration")
      .then((data) => setSocialLogins(data));
  }, []);

  return (
    <div className="social-login">
      {socialLogins.map((socialLogin) => (
        <a
          className="btn btn-block social-btn"
          href={`${import.meta.env.VITE_API_BASE_SOCIAL_LOGIN}/${socialLogin.registrationId}`}
        >
          <img
            src={`../src/assets/images/logo/${socialLogin.registrationId}.png`}
            alt={socialLogin.provider}
          />
          Sign up with {socialLogin.provider}
        </a>
      ))}
    </div>
  );
};

export default SocialLogin;
