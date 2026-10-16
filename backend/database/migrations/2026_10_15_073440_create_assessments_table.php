<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('whatsapp');
            $table->string('jurusan');
            $table->string('bahasa')->nullable();
            $table->enum('status', ['baru', 'di-hubungi', 'diterima', 'ditolak'])->default('baru');
            $table->string('sumber')->default('web-pendaftaran');
            $table->json('answers')->nullable();
            $table->json('rekomendasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
