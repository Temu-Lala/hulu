// app/i18n/request.js
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const locales = ['en', 'am']; // Add all supported locales

export default getRequestConfig(async () => {
    const headersList = headers();
    const pathName = new URL(headersList.get('referer') || '').pathname;

    // Locale detection from cookie
    const cookieStore = cookies();
    let locale = cookieStore.get('locale')?.value || 'en';

    const isValidLocale = locales.includes(locale);
    if (!isValidLocale) {
        locale = 'en'; // Fallback to English if cookie locale is invalid
    }

    return {
        locale: resolvedLocale, // Use resolvedLocale here
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});