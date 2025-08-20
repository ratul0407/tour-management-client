import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";
const AddDivisionModal = () => {
  const [image, setImage] = useState<File | null>(null);
  const [addDivision] = useAddDivisionMutation();
  console.log(image, "inside adddivision");
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [open, setOpen] = useState(false);

  const handleModalOpen = (value: boolean) => {
    setOpen(value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(image instanceof File);
    console.log(typeof image);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);
    console.log(formData.get("file"));
    const toastId = toast.loading("creating division......");
    try {
      const res = await addDivision(formData).unwrap();
      if (res?.success) {
        setOpen(false);
        toast.success("Division created successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message, { id: toastId });
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={handleModalOpen}>
        <form>
          <DialogTrigger asChild>
            <Button onClick={() => handleModalOpen(true)}>Add Division</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Division</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                id="add-tour-type"
                className="space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter division name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter the tour type name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Description </FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="enter description" />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter the tour type name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <SingleImageUploader onChange={setImage} />
            </Form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button form="add-tour-type" type="submit">
                Create Division
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddDivisionModal;
