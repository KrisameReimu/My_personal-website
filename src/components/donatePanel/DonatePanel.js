import React, {useContext} from "react";
import LanguageContext from "../../contexts/LanguageContext";
import {supportInfo} from "../../portfolio";
import "./DonatePanel.scss";

export default function DonatePanel() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {zh: "支持创作", en: "Support My Work"},
    subtitle: {
      zh: "如果你喜欢这些文章和摄影，可以用下面方式请我喝杯咖啡。",
      en: "If you enjoy the writing and photos, you can support with a small tip."
    },
    qr: {zh: "微信赞赏码", en: "WeChat Tip QR"},
    methods: {zh: "其他方式", en: "Other Methods"}
  };

  if (!supportInfo?.display) return null;

  const methodList = [
    {
      label: "PayPal",
      value: supportInfo.paypal
    },
    {
      label: "FPS",
      value: supportInfo.fps
    },
    {
      label: "Alipay",
      value: supportInfo.alipay
    },
    {
      label: "WeChat Pay",
      value: supportInfo.wechatPay
    }
  ].filter(item => item.value);

  return (
    <section className="donate-panel">
      <h2>{copy.title[language]}</h2>
      <p>{copy.subtitle[language]}</p>
      <div className="donate-content">
        {supportInfo.wechatQrImage && (
          <div className="donate-qr">
            <h3>{copy.qr[language]}</h3>
            <img src={supportInfo.wechatQrImage} alt="wechat donation qr" />
          </div>
        )}
        {methodList.length > 0 && (
          <div className="donate-methods">
            <h3>{copy.methods[language]}</h3>
            {methodList.map(method => (
              <p key={method.label}>
                <strong>{method.label}:</strong> {method.value}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
