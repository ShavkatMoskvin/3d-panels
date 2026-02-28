'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// ЗАМЕНИТЕ XXXXXXXX НА ВАШ РЕАЛЬНЫЙ ID СЧЕТЧИКА ЯНДЕКС.МЕТРИКИ
export const YM_ID = 106837657; 

/**
 * Функция для отправки целей в Яндекс.Метрику
 * @param goal - Идентификатор цели (например, 'add_to_cart')
 */
export const reachGoal = (goal: string) => {
  // @ts-expect-error - ym is added by Yandex Metrika script
  if (typeof window.ym !== 'undefined') {
    // @ts-expect-error - ym is added by Yandex Metrika script
    window.ym(YM_ID, 'reachGoal', goal);
    console.log(`[YM] Goal reached: ${goal}`);
  } else {
    console.warn(`[YM] Cannot reach goal: ${goal}. Script not loaded.`);
  }
};

function MetrikaLogic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      // @ts-expect-error - ym is added by Yandex Metrika script
      if (typeof window.ym === 'function') {
        // @ts-expect-error - ym is added by Yandex Metrika script
        window.ym(YM_ID, 'hit', window.location.href);
        console.log(`[YM] Hit sent successfully: ${window.location.href}`);
      } else {
        console.warn('[YM] window.ym is not defined yet. Data not sent.');
      }
    }, 500); // Даем небольшую задержку для инициализации скрипта

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export function YandexMetrika() {
  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YM_ID}, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true,
                 ecommerce:"dataLayer"
            });
          `,
        }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <MetrikaLogic />
      </Suspense>
    </>
  );
}
