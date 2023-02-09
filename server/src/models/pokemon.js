const validTypesFr = ['Plante', 'Poison', 'Feu', 'Insecte', 'Vol', 'Electrik', 'Normal', 'Eau', 'Fée']
const validTypes = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Name already taken'
      },
      validate: {
        notEmpty: { msg: 'name can t be blank' },
        notNull: { msg: 'name needed' }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'use integer for hp' },
        notNull: { msg: 'hp needed' }
      },
      min: {
        args: [0],
        msg: 'min hp: 0'
      },
      max: {
        args: [999],
        msg: 'max hp 999'
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'use integer for cp' },
        notNull: { msg: 'cp needed' },
        min: {
          args: [0],
          msg: 'min cp: 0'
        },
        max: {
          args: [99],
          msg: 'max cp 99'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'use valide url for picture' },
        notNull: { msg: 'picture needed' }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      }, 
      validate: {
        isTypesValid(value) {
          if (!value) {
            throw new Error('pokemon needs at least one type')
          }
          if (value.split(',').length > 3) {
            throw new Error('pokemon cannot have more than 3 types')
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type) && !validTypesFr.includes(type)) {
              throw new Error(`pokemon type should belong to this list: ${validTypes.join(' ,')}`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updateAt: false
  })
}