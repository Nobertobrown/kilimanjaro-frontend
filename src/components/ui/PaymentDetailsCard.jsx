import Button from "./Button"
import Input from "./Input";

const PaymentDetailsCard = ({pName, isLoading}) => {
  return (
    <div className="flex flex-col border self-stretch space-y-3 p-3 rounded-md">
      <p className="font-semibold">Please enter your {pName} number:</p>
      <Input required type="tel" name={`phoneNo`} placeholder="0876543210" />
      <Button text="Complete Payment" type="submit" loading={isLoading} />
    </div>
  );
}

export default PaymentDetailsCard