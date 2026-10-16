<?php

namespace Database\Seeders;

use App\Models\Assessment;
use Illuminate\Database\Seeder;

class AssessmentSeeder extends Seeder
{
    /**
     * Isi data contoh agar grafik dashboard terlihat hidup.
     * Jalankan: php artisan db:seed --class=AssessmentSeeder
     */
    public function run(): void
    {
        $majors = [
            'Global Hospitality Management',
            'Intelligent Computing',
        ];

        $statuses = ['baru', 'baru', 'baru', 'di-hubungi', 'diterima', 'ditolak'];

        $languages = [
            'Sudah di atas syarat minimum',
            'Memenuhi syarat minimum',
            'Perlu sertifikat resmi',
            'Perlu persiapan bahasa',
        ];

        $names = [
            'Rian Purnama', 'Sarah Amalia', 'Rizky Hidayat', 'Nadia Putri', 'Dimas Aditya',
            'Andi Pratama', 'Bella Kurnia', 'Citra Ayu', 'Fajar Nugroho', 'Intan Sari',
            'Joko Susilo', 'Kartika Dewi', ' Lukman Hakim', 'Maya Anggraini', 'Naufal Ariq',
            'Olivia Rahma', 'Putra Mahesa', 'Qori Amanda', 'Rafi Kurniawan', 'Sinta Melati',
            'Tegar Prasetyo', 'Umi Kalsum', 'Vina Oktaviani', 'Wahyu Saputra', 'Yoga Pratama',
        ];

        foreach ($names as $i => $name) {
            $createdAt = now()->subDays(rand(0, 13))->subMinutes(rand(0, 1400));

            Assessment::create([
                'nama' => trim($name),
                'whatsapp' => '62812'.str_pad((string) (34000000 + $i * 137), 8, '0', STR_PAD_LEFT),
                'jurusan' => $majors[$i % 2],
                'bahasa' => $languages[$i % count($languages)],
                'status' => $statuses[$i % count($statuses)],
                'sumber' => $i % 5 === 0 ? 'langsung' : 'web-cek-kelayakan',
                'answers' => ['interest' => $i % 2 === 0 ? 'hospitality' : 'tech'],
                'rekomendasi' => [
                    'major' => ['name' => $majors[$i % 2]],
                    'language' => ['label' => $languages[$i % count($languages)]],
                ],
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
}
