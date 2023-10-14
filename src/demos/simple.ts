// import PasswordWidget from '../components/PasswordWidget'
//测试数据1

export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        // minLength: 10,
        test: true,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 'retry password',
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'input color',
      },
    },
  },

  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'RRRRRRRRRRRR kicking since 1967',
    password: 'noneed',
  },
}
