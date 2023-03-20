import React from 'react';

function CheckoutWizard({ activeStep = 0 }) {
  const widthLength =
    activeStep === 0 ? '36.7%' : activeStep === 1 ? '63%' : '100%';

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl mt-10">
        Order Process
      </h1>
      <div className="mt-6" aria-hidden="true">
        <div className="bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-indigo-600 rounded-full "
            style={{ width: `${widthLength}` }}
          />
        </div>
        <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
          <div className={`${activeStep === 0 && 'text-indigo-600'}`}>
            Initialize Orders
          </div>
          <div
            className={`text-center ${activeStep === 1 && 'text-indigo-600'}`}
          >
            User Details
          </div>
          <div
            className={`text-center ${activeStep === 2 && 'text-indigo-600'}`}
          >
            Payment Method
          </div>
          <div className="text-right">Place Order</div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutWizard;
