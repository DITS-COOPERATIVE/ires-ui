<?php

namespace Database\Factories;

use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Products::class;
    public function definition(): array
    {
        return [
            'name'=>$this->faker->word(),
            'code'=>$this->faker->regexify('[A-Z]{5}[0-4]{3}'),
            'model'=>$this->faker->regexify('[A-Z]{5}[0-4]{3}'),
            'price'=>$this->faker->randomNumber(4, true),
            'quantity'=>$this->faker->randomNumber(2, true),
            'points'=>$this->faker->randomFloat(2,1000,99),
        ];
    }
}
