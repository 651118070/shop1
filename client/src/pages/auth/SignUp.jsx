import Form from '@/components/common/Form'
import React from 'react'
import { useToast } from '@/hooks/use-toast';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerFormControls } from '@/config';
import { registerUser } from '@/store/authSlice';
export default function SignUp() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const navigate=useNavigate()
  const [formData, setFormData] = useState(initialState);
  const dispatch=useDispatch()
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      
        navigate("/auth/signin");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
        setFormData(initialState)
      }
    });
  }

  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Create new account
      </h1>
      <p className="mt-2">
        Already have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/signin"
        >
          SignIn
        </Link>
      </p>
    </div>
    <Form
      formControls={registerFormControls}
      buttonText={"Sign Up"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </div>
  )
}
