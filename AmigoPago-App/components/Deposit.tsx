import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DepositComponent() {
  const depositInfo = [
    { label: "Beneficiary Name", value: "AmigoPago" },
    { label: "ACH and Wire routing number", value: "1034233349" },
    { label: "Account number", value: "354234563712" },
    { label: "Deposit message", value: "BRGDHJKKB76HJJNMSJMSJKS" },
    { label: "Account type", value: "Checking" },
    { label: "Bank name", value: "Lead Bank" },
    { label: "Bank address", value: "Avenue X, Kansas City, MO" },
  ]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">AmigoPago Deposit</CardTitle>
        <p className="text-gray-500">Deposit money to your wallet using your bank account</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {depositInfo.map((item, index) => (
          <div key={index}>
            <h3 className="text-orange-500 font-medium">{item.label}</h3>
            <p className="text-gray-700">{item.value}</p>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-orange-500 font-medium text-lg">Deposit Info</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Incoming payments take 2-3 working days to be added to your account.</li>
            <li>Limits are $1,000 per transaction. Contact support to increase it.</li>
            <li>There is no fees.</li>
          </ul>
        </div>

        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4">
          Go Back
        </Button>
      </CardContent>
    </Card>
  )
}