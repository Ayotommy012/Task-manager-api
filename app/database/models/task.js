
export default (sequelize,DataTypes) => {
const Task = sequelize.define("task", {
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoincrement: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true
    },
    title: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    
}, {
  timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  underscored: true, // Makes them `created_at` and `updated_at` in DB
})

return Task;
}
