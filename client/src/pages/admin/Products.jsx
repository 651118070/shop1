import { useDispatch ,useSelector} from 'react-redux';
import ImageUpload from '@/components/admin/ImageUpload';
import { useState,useEffect } from 'react';
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet,SheetContent,SheetHeader,SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { fetchAllProducts,addNewProduct ,deleteProduct,editProduct} from '@/store/admin/product';
import AdminProductTile from '../../components/admin/ProductTile'
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};
export default function AdminProducts() {
  const [openDialog,setOpenDialog]=useState(false)
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();
  function onSubmit(e) {
    e.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "Product edited successfully",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product added successfully",
            });
          }
        });
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted successfully",
        });
      }
    });
  }
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
    <div className='mb-5 w-full justify-end'>
    <Button onClick={() => setOpenDialog(true)}>Add New Product</Button>
    </div>
    <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
    {products && products.length > 0
          ? products.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenDialog={setOpenDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      <Sheet open={openDialog}  onOpenChange={() => {
          setOpenDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}>
          <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
            isEditMode={currentEditedId !== null}
            imageLoadingState={imageLoadingState}/>
          <div className='py-6'>
            <Form formControls={addProductFormElements} setFormData={setFormData} formData={formData} buttonText={currentEditedId !== null ? "Edit" : "Add"} onSubmit={onSubmit} isBtnDisabled={!isFormValid()}>

            </Form>
          </div>
          </SheetContent>

      </Sheet>

    </div>
 
    </>
  )
}
