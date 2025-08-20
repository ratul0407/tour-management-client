import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const addTourSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  division: z.string(),
  tourType: z.string(),
  startDate: z.any(),
  endDate: z.any(),
});
const AddTour = () => {
  const [images, setImages] = useState<File[] | []>([]);
  const { data: getTourTypes } = useGetTourTypesQuery(undefined);
  const { data: getDivisions } = useGetDivisionsQuery(undefined);
  console.log(getDivisions, getTourTypes);

  const divisionOptions = getDivisions?.map(
    (division: { _id: string; name: string }) => ({
      value: division._id,
      label: division.name,
    })
  );
  const tourTypeOptions = getTourTypes?.data?.map(
    (tourType: { _id: string; name: string }) => ({
      value: tourType._id,
      label: tourType.name,
    })
  );
  const form = useForm<z.infer<typeof addTourSchema>>({
    resolver: zodResolver(addTourSchema),
    defaultValues: {
      title: "",
      description: "",
      division: "",
      tourType: "",
      location: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addTourSchema>) => {
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    };

    console.log(tourData);
  };
  return (
    <div>
      <h1 className="text-4xl font-bold">Add Tour</h1>
      <Card className="w-full mt-12 ">
        <CardHeader>
          <CardTitle>Create a Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="add-tour" onSubmit={form.handleSubmit(onSubmit)}>
              {/* form container */}
              <div className="grid gap-8">
                <div className="flex w-full gap-3">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="enter tour title"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="enter division name"
                              type="text"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* select container */}
                <div className="flex w-full gap-3">
                  {/* division select  */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="division"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Division</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {divisionOptions?.map(
                                (option: { value: string; label: string }) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* tour type select  */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="tourType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tour Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tourTypeOptions?.map(
                                (option: { value: string; label: string }) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full flex-1">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <
                                new Date(
                                  new Date().setDate(new Date().getDate() - 1)
                                )
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full flex-1">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full  pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <
                                new Date(
                                  new Date().setDate(new Date().getDate() - 1)
                                )
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full items-stretch  gap-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="enter tour description"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex-1">
                    <MultipleImageUploader onChange={setImages} />
                  </div>
                </div>
              </div>
            </form>
          </Form>
          <Button form="add-tour" type="submit" className="text-white">
            Create Tour
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTour;
