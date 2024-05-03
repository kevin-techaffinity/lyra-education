export const displayProgress = (myProgress, modules) => {
    const matchingObjects = [];
    
    if(modules) {
      myProgress.forEach(obj1 => {
        const matchingObj = modules?.find(obj2 => obj2.id === obj1.id);
        if (matchingObj) {
            matchingObjects.push(matchingObj);
        }
      });
    }

    return {data: matchingObjects}
  }