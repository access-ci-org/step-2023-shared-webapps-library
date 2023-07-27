function compareFn(a, b) {
  // Convert the latest_status_end fields to Date objects
  const dateA = new Date(a[1].split('/').reverse().join('-'));
  const dateB = new Date(b[1].split('/').reverse().join('-'));

  // Compare the dates
  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  } else {
    return 0;
  }
}

const words = ['lorem', 'dolor', 'default'];

// Fetch data from the API
fetch('https://operations-api.access-ci.org/wh2/cider/v1/access-allocated/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Extract the fields from the data
    const projects = data.results.map(project => ({
      resource_descriptive_name: project.resource_descriptive_name,
      latest_status_begin: project.latest_status_begin,
      latest_status_end: project.latest_status_end
    }));

    // Create an array of timesheet data
    const timesheetData = projects
      .filter(project => project.latest_status_begin && project.latest_status_end)
      .map(project => {
        // Calculate the percentage of the project time that has been completed
        const beginDate = new Date(project.latest_status_begin);
        const endDate = new Date(project.latest_status_end);
        const currentDate = new Date();
        const totalTime = endDate.getTime() - beginDate.getTime();
        const completedTime = currentDate.getTime() - beginDate.getTime();
        const completedPercentage = completedTime / totalTime;

        // Choose an element from the words array based on the completed percentage
        let word;
        if (completedPercentage >= 0.75) {
          word = words[0];
        } else if (completedPercentage >= 0.5) {
          word = words[1];
        } else {
          word = words[2];
        }

        return [
          project.latest_status_begin.slice(5, 7) + '/' + project.latest_status_begin.slice(0, 4),
          project.latest_status_end.slice(5, 7) + '/' + project.latest_status_end.slice(0, 4),
          project.resource_descriptive_name,
          word
        ];
      });

    timesheetData.sort(compareFn);

    // Initialize the timesheet
    new Timesheet('timesheet', 2012, 2050, timesheetData);
    console.log(timesheetData)
  });
