import React, {useEffect, useState} from 'react'
import Image1 from 'next/legacy/image'
import Success from '../public/images/success.svg'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getModule } from '../services/Content';
import { payingPlan } from './billing'
import { updateSubscription } from '../public/data/courseSubscription'
import { createSubscription } from '../services/CourseSubscription'

const SuccessPay = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [module, setModule] = useState({});
  const amount = searchParams.get('amount');
  const item = searchParams.get('item');
  const plan = searchParams.get('plan');
  const course = decodeURIComponent(searchParams.get('course'));

  useEffect(() => {
    getModule(course).then((data) => {
      setModule(data);
    });

  }, []);

  const handleCourseSubscribe = () => {
    createSubscription({plan_id: plan, amount, moduleId: module?.id}).then((data) => {})

    router.push('/module/' + course)
  }

  return (
    <div className='w-100 my-5 d-flex justify-content-center align-items-center'>
      <div className='bg-white d-flex flex-column align-items-center shadow px-5 py-3'>
        <Image1 src={Success} width="80" height="80" />
        <h5 className='text-center my-4 text-success'>Payment Succeded</h5>
        <p className='text-center'><small className='text-muted'> Thanks for yout commitment to our platform. <br /> It's always great time with us.</small></p>
        <button className='btn btn-success rounded w-100 mb-3' onClick={handleCourseSubscribe}>Done</button>
      </div>
    </div>
  )
}

export default SuccessPay
