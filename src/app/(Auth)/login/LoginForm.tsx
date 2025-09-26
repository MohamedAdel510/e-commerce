'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form'
import { Input } from '_/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form'
import { schema } from './login.schema';
import { LoginType } from './login.type';
import { Button } from '_/components/ui/button';
import { handleLogin } from './Login.actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
import {signIn} from 'next-auth/react'

export default function LoginForm() {

    async function myHandleSubmit(data : LoginType){
        
        
        // const response = await handleLogin(data);

        // if(response.message == 'success'){
        //     toast.success("Welcome back", {position: "top-right", duration: 2000,
        //         style: {
        //             '--normal-bg':
        //             'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
        //             '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
        //             '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        //         } as React.CSSProperties});
        // }
        // else if(response.statusMsg == 'fail'){
        //     toast.error(response.message, {position: "top-right", duration: 2000, 
        //         style: {
        //             '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
        //             '--normal-text': 'var(--destructive)',
        //             '--normal-border': 'var(--destructive)'
        //         } as React.CSSProperties
        //     });
        // }
        // else{
        //     return <h1>server error</h1>
        // }

        const response = await signIn('credentials', 
            {
                ...data,
                redirect: false,
                // callbackUrl: '/', 
            }
        );

        

        if(response?.ok){
            toast.success("Welcome back", {position: "top-right", duration: 2000,
            style: {
                '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
            } as React.CSSProperties});
            
            window.location.replace('/');
        }
        else{
            toast.error("Invalid email or password", {position: "top-right", duration: 2000, 
                style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            });
        }
         
    }
  
    const RHFobj = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schema)
    });

    const { control, handleSubmit } = RHFobj;
    return (
    <Form  {...RHFobj} >
        <form onSubmit={handleSubmit( myHandleSubmit )}>
        <FormField
            control={control}
            name="email"
            render={( {field} ) => (
            <FormItem>
                <FormLabel >Email</FormLabel>
                <FormControl>
                <Input {...field}  type= "email"/>
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={control}
            name="password"
            render={( {field} ) => (
            <FormItem>
                <FormLabel >Password</FormLabel>
                <FormControl>
                <Input {...field}  type= "password"/>
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />

        <Button className='w-full bg-[#634C9F] cursor-pointer'> Login </Button>
        </form>
    
    {/* <Link href='/api/auth/signin'><Button className='cursor-pointer w-full bg-[#634C9F] mt-2.5 '> Login with Meem  </Button></Link> */}
    </Form>
  )
}
