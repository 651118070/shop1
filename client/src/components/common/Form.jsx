import React from 'react'
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
export default function Form({formControls,formData,
    setFormData,
    onSubmit,
    buttonText,
    isBtnDisabled,}) {
    const types={
        INPUT:'input',
        SELECT:'select',
        TEXTAREA:'textarea'
        
    }
    function renderInputsByComponentType(getControlItem){
        let element=null
        const value=formData[getControlItem.name] || ''
        switch(getControlItem.componentType){
            case types.INPUT:
                element=<Input type={getControlItem.type} placeholder={getControlItem.placeholder} name={getControlItem.name}  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: event.target.value,
                    })
                  }/>
                break;
            case types.TEXTAREA:
                element=<Textarea value={value} placeholder={getControlItem.placeholder}  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: event.target.value,
                    })
                  } />
                break;
            case types.SELECT:
                element=<Select value={value}   onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: value,
                    })
                  }>
                    <SelectTrigger>
                        <SelectValue placeholder={getControlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {getControlItem.options && getControlItem.options.length > 0 ? getControlItem.options.map((option)=>(
                            <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                        )):null}
                    </SelectContent>
                </Select>
                break;
            case "button":
                element=<Button>{getControlItem.label}</Button>
                break;
            default:
                element=null
        }
        return element

    }
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {formControls.map((control)=>(
            <div key={control.name} className='grid w-full gap-1.5'>
                <Label htmlFor={control.name}className='mb-2'>{control.label}</Label>
                {renderInputsByComponentType(control)}

            </div>
        ))}
       
         
      </div>
      <Button type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
  )
}
