<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Buat / perbarui akun admin default.
     * Kredensial bisa diubah lewat variabel lingkungan ADMIN_EMAIL & ADMIN_PASSWORD.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@karirdikorea.com')],
            [
                'name' => env('ADMIN_NAME', 'Admin Karir di Korea'),
                'password' => env('ADMIN_PASSWORD', 'admin12345'),
            ],
        );
    }
}
