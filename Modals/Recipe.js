/* Importing the mongoose library and the schema from mongoose. */
const { Collection } = require("mongoose");
const mongoose = require("mongoose");

const { Schema } = mongoose;
/* Creating a schema for the recipe model. */
const RecipeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  instruction:[String],
  date: {
    type: Date,
    default: Date.now,
  },
  views:{
    type:Number,
    default:0
  },
  totalRatings:{
 type: Number,
    default: 0,
  },
  averageRating:{
     type: Number,
    default: 0,
  },
  Likes: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
  },
  image: {
    url: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  source: {
    type: String,
  },
  dietLabels: [String],
  healthLabels: [String],
  cautions:[String],
  ingredientLines: [String],
  ingredients: [
    {
      text: {
        type: String,
      },
      weight: {
        type: Number,
      },

      image: {
        type: String,
      },
    },
  ],
  calories: {
    type: Number,
  },
  totalWeight: {
    type: Number,
  },
  totalTime: {
    type: Number,
  },
  cuisineType: [String],
  mealType: [String],
  dishType: [String],
  totalNutrients: {
    ENERC_KCAL: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    FAT: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },

    CHOCDF: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    FIBTG: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    SUGAR: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    PROCNT: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    CHOLE: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    CA: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    FE: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    VITA_RAE: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    VITC: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    THIA: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    RIBF: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    NIA: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    VITB6A: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    FOLAC: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    VITB12: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    VITK1: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    VITD: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    TOCPHA: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    WATER: {
      label: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
  },
},{timestamps:true});
RecipeSchema.index({createdAt:-1})

module.exports = mongoose.model("Recipe", RecipeSchema);
