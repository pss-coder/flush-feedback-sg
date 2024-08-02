'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useTransition } from 'react'
import { useLocale } from 'use-intl';

export default function LocaleSwitcher({endpoint}: {endpoint: string}) {

    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    const localActive = useLocale();

const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value
    startTransition(() => {
        router.replace(`/${nextLocale}/` + endpoint)
    })

}

  return (
    <label>
        <p className='sr-only'>Change Language</p>
        <select defaultValue={localActive} 
        className="block w-full rounded-md border-0 py-1.5 px-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={onSelectChange}
        disabled={isPending}
        >
            <option value="en">English</option>
            <option value="zh-cn">中文</option>
        </select>
    </label>
  )
}
