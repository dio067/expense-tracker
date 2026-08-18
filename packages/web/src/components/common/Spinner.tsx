import { Spinner } from "@heroui/react";

export function SpinnerBasic() {
  return (
    <div className='flex items-center gap-8 justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Spinner color='current' />
      </div>
    </div>
  );
}
