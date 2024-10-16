import Form from '@/components/common/Form'
import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {loginFormControls } from '@/config';
import { loginUser } from '@/store/authSlice';
import { useToast } from '@/hooks/use-toast';
export default function SignIn() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch=useDispatch()
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      
       
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
        
      }
      console.log(data)
    

    })
   
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
    <div className="text-center ">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Welcome back
      </h1>
      <p className="mt-2">
       Don't have an account?
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/signup"
        >
          SignUp
        </Link>
      </p>
    </div>
    <Form
      formControls={loginFormControls}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </div>
  )
}
