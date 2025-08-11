import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOTPMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Label } from "@/components/ui/label";
// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
// import { useLocation, useNavigate } from "react-router";

const formSchema = z.object({
  pin: z.string().min(6, { message: "Your otp must be 6 characters long" }),
});
const Verify = () => {
  const [sendOtp] = useSendOTPMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  // const location = useLocation();
  // const navigate = useNavigate();
  // const [email, setEmail] = useState(location.state);
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email]);

  return (
    <Card className="w-full min-h-screen justify-center flex flex-col  items-center">
      <CardHeader className="w-full text-center">
        <CardTitle>Verify your email address</CardTitle>
        <CardDescription>Enter your otp below to Verify</CardDescription>
      </CardHeader>
      <CardContent className="w-full text-center mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>One time password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Verify;
