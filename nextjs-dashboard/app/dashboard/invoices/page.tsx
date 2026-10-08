import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import {CreateInvoice} from '@/app/ui/invoices/buttons';
import {lusitana} from '@/app/ui/fonts';
import {InvoicesTableSkeleton} from '@/app/ui/skeletons';
import {Suspense} from 'react';

/* Когда URL меняется, Next.js автоматически ререндерит Server Component */
/* searchParams и params - зарезервированы Next'ом под данный из URL
   они передаются пропсам при каждом rerender */
export default async function Page(props: {
    searchParams?: Promise<{
        /* тип Promise нужен для того, чтобы не блокировать UI
           при разборе URL, но конкретно в данном случае, всё-равно блокируется
           можно передать промис как пропс в Table, чтобы не блокировать код
           в данном компоненте */
        query?: string;
        page?: string;
    }>;
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..."/>
                <CreateInvoice/>
            </div>
            {/*Показывается fallback, пока на сервере выполняется запрос к БД*/}
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
                <Table query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
        </div>
    );
}

/*
1. Пользователь вводит текст в Search
   ↓
2. Search компонент меняет URL (?query=test)
   ↓
3. Next.js видит изменение URL
   ↓
4. Next.js АВТОМАТИЧЕСКИ перерендерит page.tsx
   ↓
5. page.tsx получает новые searchParams из нового URL
   ↓
6. Table компонент получает новый query и показывает новые данные
*/