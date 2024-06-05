<?php

namespace Database\Factories;

use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $list = TodoList::inRandomOrder()->first();
        return [
            'name' => fake()->text(24),
            'list_id' => $list->id,
            'completed' => fake()->randomElement([0, 1]),
            'duedate' => fake()->dateTimeBetween('-1 week', '+1 week')
        ];
    }
}
