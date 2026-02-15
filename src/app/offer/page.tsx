import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header section */}
      <section className="pt-32 pb-12 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Назад на главную</span>
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-slate-900 mb-4">
            Публичная оферта
          </h1>
          <p className="text-slate-500 text-sm">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate prose-headings:uppercase prose-headings:tracking-widest prose-headings:font-bold prose-p:text-slate-600">
            <h3>1. Общие положения</h3>
            <p>
              1.1. Настоящая публичная оферта (далее — Оферта) является официальным предложением интернет-магазина «MoskWin 3D Panels» в адрес любого физического или юридического лица заключить с Продавцом договор розничной купли-продажи товара на Сайте дистанционным образом на условиях, определенных в настоящем Договоре.
            </p>
            <p>
              1.2. Акцептом (принятием) Оферты является факт оформления Заказа Покупателем на Сайте Продавца.
            </p>

            <h3>2. Предмет договора</h3>
            <p>
              2.1. Продавец обязуется передать в собственность Покупателю, а Покупатель обязуется оплатить и принять Товар, заказанный в интернет-магазине.
            </p>

            <h3>3. Оформление заказа</h3>
            <p>
              3.1. Заказ Товара осуществляется Покупателем через сервис сайта интернет-магазина moskwin.ru.
            </p>
            <p>
              3.2. При оформлении заказа на сайте Покупатель обязуется предоставить следующую регистрационную информацию:
            </p>
            <ul>
              <li>фамилия, имя, отчество Покупателя или указанного им лица (получателя);</li>
              <li>адрес, по которому следует доставить Товар (если доставка до адреса Покупателя);</li>
              <li>адрес электронной почты;</li>
              <li>контактный телефон.</li>
            </ul>

            <h3>4. Доставка и передача товара покупателю</h3>
            <p>
              4.1. Услуги по доставке Товара оказываются Продавцом или привлеченными им третьими лицами (Транспортными компаниями).
            </p>
            <p>
              4.2. Место доставки Товара Покупатель указывает при оформлении Заказа на приобретение Товара.
            </p>
            <p>
              4.3. Срок доставки Товара Покупателю состоит из срока обработки заказа и срока доставки.
            </p>

            <h3>5. Оплата товара</h3>
            <p>
              5.1. Цена товара указывается в рублях Российской Федерации.
            </p>
            <p>
              5.2. Оплата Товара производится Покупателем в рублях путем безналичного расчета (онлайн-оплата на сайте) или иными способами, указанными на сайте интернет-магазина.
            </p>

            <h3>6. Возврат товара и денежных средств</h3>
            <p>
              6.1. Возврат Товара осуществляется в соответствии с Законом РФ «О защите прав потребителей».
            </p>
            <p>
              6.2. Покупатель вправе отказаться от Товара в любое время до его передачи, а после передачи Товара — в течение 7 дней.
            </p>
            <p>
              6.3. Возврат Товара надлежащего качества возможен в случае, если сохранены его товарный вид, потребительские свойства, а также документ, подтверждающий факт и условия покупки указанного Товара.
            </p>

            <h3>7. Реквизиты продавца</h3>
            <p>
              <strong>Интернет-магазин «MoskWin 3D Panels»</strong><br />
              Email: <a href="mailto:shavkatmoskvin@gmail.com" className="text-blue-600 hover:underline">shavkatmoskvin@gmail.com</a><br />
              Telegram: <a href="https://t.me/moskvinsh" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@moskvinsh</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
