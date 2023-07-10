function _calculateAge (birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default {
  name: 'Joe McBroom',
  location: 'Columbus, OH',
  phone: '(818)809-8454',
  email: 'joe.mcbroom.10@gmail.com',
  birthday: '01/12/1987',
  age: `${_calculateAge(new Date('01/12/1987'))}`,
  links: [
    { name: 'LinkedIn', href: 'linkedin.com/in/joseph-mcbroom' },
    { name: 'GitHub', href: 'github.com/jumokee' },
  ],
  objective:
    'Full stack software developer specializing in Typescript development. Proficient in creating dynamic web applications using technologies such as Node.js, React, and Vue.js. Strong understanding of object-oriented programming principles and experience with Agile development methodologies. Demonstrated ability to lead teams and deliver high-quality, scalable software solutions on time.',
  skills: {
    'Back End and OOP': ['Node.js (Javascript/Typescript)', 'JAVA'],
    'Front End Technologies': [
      'JavaScript',
      'React',
      'Next.js',
      'Vue.js',
      'Tailwind CSS',
      'Ember.js',
      'HTML',
      'CSS',
      'SCSS/Sass',
      'jQuery',
      'Bootstrap',
      'HCL (IBM) Websphere Content Management',
    ],
    'Development Tools/Techniques': [
      'ElasticSearch',
      'Redis',
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
      name: 'WillowTree',
      startDate: 'March \'22',
      endDate: 'Present',
      title: 'Senior Software Engineer',
      details: [
        'Full stack developer specializing in Next.js and React',
        'Leading a team of contractors through a rewrite of a large complex application from Angular to Next.js',
        'Work with AGILE practices, daily standups, 2 week sprints, etc.',
      ]
    },
    {
      name: 'Thought Industries',
      startDate: 'Febuary \'21',
      endDate: 'March \'22',
      title: 'Javascript Application Engineer',
      details: [
        'Full stack developer',
        'Building and maintaining user interfaces for SaaS education platform',
        'Utilize Ember.js, Node.js, GraphQL',
        'Work with AGILE practices, including standups, in small teams',
      ],
    },
    {
      name: 'Base22',
      startDate: 'August \'19',
      endDate: 'Febuary \'21',
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
      startDate: 'May \'19',
      endDate: 'Aug \'19',
      title: 'Full Stack Bootcamp',
      details: [
        '14 week full stack software development program',
        'Focus on dynamic web based software applications',
        'Java/PostgreSQL/Vue.js Tech Stack',
      ],
    },
  ],
};
