export const courseSubscription = [];

const sumOfCourseDuration = (arr, property) => {
  let sum = 0;
  arr.forEach((item) => {
    item.course.forEach((el) => {
      sum += +el[property];
    });
  });
  return sum;
};

export const updateSubscription = (user, plan, module, amount) => {
  const index = courseSubscription.findIndex((course) => course.user === user );
  
  if (index !== -1) {
    console.log('Hereee 22')
    if ((courseSubscription[index].course.filter(obj => obj.hasOwnProperty('duration'))).length > courseSubscription[index].duration) {
      console.log('Hereee')
      courseSubscription[index].duration += +plan.duration;
      courseSubscription[index].plan = plan;
      courseSubscription[index].course.push(module);
      courseSubscription[index].amount += +amount;
      courseSubscription[index].createdAt = Date.now();
    }
    
  } else {
    courseSubscription.push({
      user,
      course: [module],
      plan: plan,
      amount,
      duration: plan?.duration - 1,
      createdAt: Date.now(),
    });
  }
};

export const checkSubscription = (module, user) => {

  const foundSubscription = courseSubscription.find((course) => course.user == user);

  if (foundSubscription) {
    const index = foundSubscription.course.findIndex((course) => course.id === module.id);
    if (index !== -1) {
      return false;
    } else {
      if (foundSubscription?.plan?.name != 'Platinum' && foundSubscription?.duration > 0) {

        const key = courseSubscription.findIndex((course) => course.user == user);
        if(key !== -1) {
            courseSubscription[key].course.push(module);
            courseSubscription[key].duration - 1;

            return false;
        }

        return true;
    } else {
        return true;
      }
    }
  } else {
    return true;
  }
};
