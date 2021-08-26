function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  name: 'Joe McBroom',
  location: 'Columbus, OH',
  phone: '(818)809-8454',
  email: 'joe.mcbroom.10@gmail.com',
  birthday: '01/12/1987',
  age: `_calculateAge(new Date('01/12/1987'))`,
  links: [
    { name: 'LinkedIn', href: 'linkedin.com/in/joseph-mcbroom' },
    { name: 'GitHub', href: 'github.com/jumokee' },
  ],
  objective:
    'Highly motivated, analytical, and people focused.  Software developer specializing in full stack Javascript development.  Strong knowledge of Object-Oriented programming and web application development.',
  skills: {
    'Object Oriented Programming': ['Node.js (Javascript/Typescript)', 'JAVA'],
    'Front End Technologies': [
      'Ember.js',
      'HTML',
      'CSS',
      'SCSS/Sass',
      'Vue.js',
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'HCL (IBM) Websphere Content Management',
    ],
    'Development Tools/Techniques': [
      'GraphQL',
      'AWS (Lambda, S3)',
      'Agile',
      'Unit Testing (JUnit, JEST)',
      'Integration Testing',
      'Git',
      'Unix Command Line',
      'JSON',
    ],
    'Database Programming': ['RethinkDB', 'PostgreSQL', 'DbVisualizer'],
  },
  experience: [
    {
      name: 'Thought Industries',
      startDate: 'Febuary 2021',
      endDate: 'Present',
      title: 'Javascript Application Engineer',
      details: [
        'Full stack developer',
        'Designed, developed, and tested a feature rich comment dashboard for a large state agency',
        'Building and maintaining user interfaces for SaaS education platform',
        'Utilize Ember.js, Node.js, and GraphQL',
        'Work with AGILE practices, including standups, in small teams',
      ],
    },
    {
      name: 'Base22',
      startDate: 'August 2019',
      endDate: 'Febuary 2021',
      title: 'Enterprise Web Developer',
      details: [
        'Utilizing varied technologies to develop the front end experience for users and authors of various State of Ohio agencies',
        'Designed, developed, and tested a feature rich comment dashboard for a large state agency',
        'Work with AGILE practices, including standups, in small teams',
        'Developing strong debugging skills',
        'Improving code quality, Object Oriented adherence, and separation of concerns',
      ],
    },
  ],
  education: [
    {
      name: 'Tech Elevator',
      startDate: 'May 2019',
      endDate: 'Aug 2019',
      title: 'Full Stack Bootcamp',
      details: [
        '14 week full stack software development program',
        'Focus on dynamic web based software applications',
        'Java/PostgreSQL/Vue.js Tech Stack',
      ],
    },
  ],
};
