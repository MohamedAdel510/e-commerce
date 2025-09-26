'use client'
import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form'
import { Input} from '_/components/ui/input';
import { Button} from '_/components/ui/button';
import { schema } from './Rigester.schema';
import { useForm } from 'react-hook-form';
import { zodResolver} from '@hookform/resolvers/zod';
import { RegisterType } from './Rigester.type';
import { handleRegister } from './Register.actions';
import { toast } from 'sonner';
import { cookies } from 'next/headers';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';



export default  function RegisterFrom () {

    async function  myHandleSubmit(data : RegisterType){ 
    
      const Registerd = await handleRegister(data); 
      
    if(Registerd.message == 'success'){ // in case true

        toast.success("Registration successfull", {position: "top-right", duration: 2000,
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
          } as React.CSSProperties
        });
        //navigate 
    }
    else if( Registerd.statusMsg  == 'fail' ){ // in case error message
        toast.error(Registerd.message, {position : "top-right", duration: 2000,
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)'
          } as React.CSSProperties
        });
    }
    else{
      return <h1>Server Error</h1>
    }
   
  }

  async function handleGoogleSignUP(){
    const res = await signIn('google', {
       redirect: false,
      //  callbackUrl: "/"
    });

    // console.log( "res", res );
    
  }

    
  const  RHFobj = useForm({
    defaultValues:{
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
    resolver : zodResolver(schema)
  });

  const { control, handleSubmit } = RHFobj;

  return (
    
    <Form  {...RHFobj} >
      <form    onSubmit={ handleSubmit( myHandleSubmit) }>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel >Name: </FormLabel>
            <FormControl>
              <Input  {...field} type='text'  />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel >Email: </FormLabel>
            <FormControl>
              <Input  {...field} type='email'  />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

        <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel >Phone: </FormLabel>
            <FormControl>
              <Input  {...field} type='tel'  />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel >Password: </FormLabel>
            <FormControl>
              <Input  {...field} type='password'  />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="rePassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel >Confirm password: </FormLabel>
            <FormControl>
              <Input  {...field} type='password'  />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      

      <Button className='w-full '>Register</Button>
      </form>

      <Button onClick={ handleGoogleSignUP } className='w-full mt-3 cursor-pointer '>
        <FcGoogle />
        Sign up with Google
      </Button>
    </Form>
    
  )
}
