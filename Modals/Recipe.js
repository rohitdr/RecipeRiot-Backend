const { Collection } = require("mongoose");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const RecipeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  instruction:{
    type:Array
  }
   ,

  date: {
    type: Date,
    default: Date.now,
  },
  Comments:[ {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
    username:{
      type: String,
    },
    Profileimage: {
      type: String,
    },
  }],
  Likes: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    
  },
  image: {
    type: String,
    
  },
  source: {
    type: String,
    
  },
  dietLabels: {
    type: Array,
    
  },
  healthLabels: {
    type: Array,
    
  },
  cautions: {
    type: Array,
    
  },
  ingredientLines: {
    type: Array,
    
  },
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
  cuisineType: {
    type: Array,
    
  },
  mealType: {
    type: Array,
    
  },
  dishType: {
    type: Array,
    
  },
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
    FASAT: {
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
    FIGBIG: {
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
});

module.exports = mongoose.model("Recipe", RecipeSchema);
