-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 13, 2021 at 01:35 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `aub`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(9, '2021_08_16_135548_add_email_verification_to_users_table', 1),
(10, '2021_08_16_143812_add_forgot_password_to_users_table', 1),
(11, '2021_08_20_090619_create_questions_table', 1),
(12, '2021_08_20_092156_create_user_submissions_table', 1),
(13, '2021_08_23_151901_add_fields_to_users_table', 1),
(14, '2021_08_23_152307_drop_name_in_users_table', 1),
(15, '2021_08_26_095141_create_sections_table', 1),
(16, '2021_08_26_095232_add_section_id_to_questions_table', 1),
(17, '2021_08_26_122501_create_user_submission_answers_table', 1),
(18, '2021_08_26_125219_make_answer_nullable_on_user_submission_answers_table', 1),
(19, '2021_08_30_122729_create_zones_table', 2),
(20, '2021_08_30_123000_add_zone_id_to_user_submissions_table', 2),
(21, '2021_08_31_094252_add_display_in_table_to_questions_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('2bbf76445d48da98034190364ac455eef9dad3791b98ee2c548daaa09059f4c8a073ad9caf9794b9', 1, 1, 'API Token', '[]', 0, '2021-08-26 11:28:43', '2021-08-26 11:28:43', '2022-08-26 14:28:43'),
('3b20a2930f17271c88a57a16d517b51045945af20e5b312d2a6982cf5e522d3cb461c87fc4e4dd65', 1, 1, 'API Token', '[]', 0, '2021-09-01 08:48:01', '2021-09-01 08:48:01', '2022-09-01 11:48:01'),
('4a832ec2752e031efafd0effffbe530414718b8aa704670c8a16635556b6504fb25bffa0325a4afb', 1, 1, 'API Token', '[]', 0, '2021-09-01 09:02:45', '2021-09-01 09:02:45', '2022-09-01 12:02:45'),
('7dfa1920fe72de03c00fbad875d3f9ab056142841b5fe5b71b49f84eb9baee52336572cdb352ae3a', 1, 1, 'API Token', '[]', 0, '2021-09-07 06:36:25', '2021-09-07 06:36:25', '2022-09-07 09:36:25'),
('899f82759d156186a75de2a973a830b58eb6464d81160eb06547c603600356ff438357350cf8bf1e', 1, 1, 'API Token', '[]', 0, '2021-09-01 09:11:04', '2021-09-01 09:11:04', '2022-09-01 12:11:04'),
('ab0d5c803e2bf6e7b3c19531d0195a62c0192ec4dc3284798b918ca5c544e94fe8896aabe63219d2', 1, 1, 'API Token', '[]', 0, '2021-09-07 06:35:02', '2021-09-07 06:35:02', '2022-09-07 09:35:02'),
('acbed7cc73dc9d05cae969677600f9248fa734b2df2f5cb6cee696460623d3eaa37c532684e6f757', 1, 1, 'API Token', '[]', 0, '2021-09-01 08:44:15', '2021-09-01 08:44:15', '2022-09-01 11:44:15'),
('b2449e4b2b01e75a81d571783a44bb788ff1615c8abc315d452f45bc49a8d9242fd379254a712cea', 1, 1, 'API Token', '[]', 0, '2021-09-01 08:45:05', '2021-09-01 08:45:05', '2022-09-01 11:45:05'),
('ecf8c2fed5370b4e1a9f5d14de0161b600be9dd062728904f19f7614cae2621361d9ec525d9a25e4', 1, 1, 'API Token', '[]', 0, '2021-08-27 08:45:53', '2021-08-27 08:45:53', '2022-08-27 11:45:53'),
('fe5503859f085700a8a76343f665e9bbef3d401acf2ebb497202520288f6daad6fd4011b993130e0', 1, 1, 'API Token', '[]', 0, '2021-08-30 09:53:33', '2021-08-30 09:53:33', '2022-08-30 12:53:33');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'WArtCcUXi5MxbYlNyb5przKUtUGQ6Ft9NezQKeKu', NULL, 'http://localhost', 1, 0, 0, '2021-08-26 11:28:16', '2021-08-26 11:28:16'),
(2, NULL, 'Laravel Password Grant Client', 'mjNFn9HkItLLf8pxWfg38Kt4kLeeWbd5pw1oMZAV', 'users', 'http://localhost', 0, 1, 0, '2021-08-26 11:28:16', '2021-08-26 11:28:16');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-08-26 11:28:16', '2021-08-26 11:28:16');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `config` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `display_in_table` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question_id`, `question`, `config`, `created_at`, `updated_at`, `section_id`, `display_in_table`) VALUES
(1, 1, 'Email Address', '{\"type\": \"textfield\", \"question\": \"Email Address\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 1, 0),
(2, 2, 'Phone Number', '{\"type\": \"textfield\", \"question\": \"Phone Number\", \"user_validation\": \"nullable\", \"researcher_validation\": \"nullable\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 1, 0),
(3, 3, 'Nationality', '{\"type\": \"dropdown\", \"options\": [\"all nationalities\"], \"question\": \"Nationality\", \"user_validation\": \"nullable\", \"researcher_validation\": \"nullable\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 1, 0),
(4, 4, 'Born in Beirut', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\"], \"question\": \"Born in Beirut\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 1, 0),
(5, 5, 'Household General Profile', '{\"type\": \"dropdown\", \"options\": [\"Couple\", \"Couple with children\", \"More than 1 family living together\", \"Single woman\", \"Single Woman with children\", \"Single man\", \"Single man with children\", \"Shared aparment (women only)\", \"Shared aparatment (both genders)\"], \"multiple\": true, \"question\": \"Household General Profile\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(6, 6, 'Number of Families in Housing Unit', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Families in Housing Unit\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(7, 7, 'Number of Occupants in Unit', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Occupants in Unit\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(8, 8, 'Number of Adults, Men (19-64)', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Adults, Men (19-64)\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(9, 9, 'Number of Adults, Women (19-64)', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Adults, Women (19-64)\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(10, 10, 'Number of Children, (Below 18)', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Children, (Below 18)\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(11, 11, 'Number of Live in domestic workers', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Live in domestic workers\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(12, 12, 'Number of Elderly, Men (above 64)', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Elderly, Men (above 64)\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(13, 13, 'Number of Elderly, Women (above 64)', '{\"type\": \"dropdown\", \"options\": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Elderly, Women (above 64)\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(14, 14, 'Number of Providers in the household', '{\"type\": \"dropdown\", \"options\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], \"question\": \"Number of Providers in the household\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(15, 15, 'Do you  have a fixed source of income', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\"], \"question\": \"Do you  have a fixed source of income\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(16, 16, 'Average Household income (in LBP)', '{\"type\": \"dropdown\", \"options\": [\"Less than 675k\", \"675k - 1,200k\", \"1,200k - 2,000k\", \"2,000k - 4,000k\", \"4,000k - 6,000k\", \"6,000k - 8,000k\", \"8,000k - 10,000k\", \"10,000k - 12,000k\", \"12,000k - 14,000k\", \"14,000k - 16,000k\", \"16,000k - 18,000k\", \"18,000k - 20,000k\", \"more than 20,000k\"], \"question\": \"Average Household income (in LBP)\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"nullable\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 2, 0),
(17, 17, 'Building Name', '{\"type\": \"textfield\", \"question\": \"Building Name\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 0),
(18, 18, 'Building Status', '{\"type\": \"dropdown\", \"options\": [\"Incomplete\", \"Complete\"], \"question\": \"Building Status\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(19, 19, 'Building General Condition', '{\"type\": \"dropdown\", \"options\": [\"Dilapidated\", \"Fair\", \"Good\", \"Renovated\", \"New\"], \"question\": \"Building General Condition\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(20, 20, 'Building Year of Completion', '{\"type\": \"dropdown\", \"options\": [\"Before 1940\", \"1940 - 1953\", \"1954 - 1971\", \"1972 - 1983\", \"1984 - 1991\", \"1992 - 2004\", \"2005 - Present\", \"Don\'t know\"], \"question\": \"Building Year of Completion\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(21, 21, 'Number of Blocks', '{\"type\": \"textfield\", \"question\": \"Number of Blocks\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(22, 22, 'Number of Floors', '{\"type\": \"textfield\", \"question\": \"Number of Floors\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(23, 23, 'Number of Apartments in Block', '{\"type\": \"textfield\", \"question\": \"Number of Apartments in Block\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(24, 24, 'Total number of apartments', '{\"type\": \"textfield\", \"question\": \"Total number of apartments\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(25, 25, 'Building is gated?', '{\"type\": \"dropdown\", \"options\": [\"Opaque Wall\", \"Transoarent/Glazed Walls\", \"Fence\", \"Boom Barrier\", \"Bollars\", \"No Gate\"], \"question\": \"Building is gated?\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(26, 26, 'Building has a full time Concierge (Natour)', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\"], \"question\": \"Building has a full time Concierge (Natour)\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(27, 27, 'Building has a full time Security', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\"], \"question\": \"Building has a full time Security\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(28, 28, 'Building has a private generator', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\"], \"question\": \"Building has a private generator\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(29, 29, 'Building has an underground water well', '{\"type\": \"dropdown\", \"options\": [\"Yes-used\", \"Yes-Saline-used\", \"Yes-not-used\", \"No\"], \"question\": \"Building has an underground water well\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(30, 30, 'Additonal Building Amenities', '{\"type\": \"dropdown\", \"options\": [\"Garden\", \"Children Playground\", \"Fitness Center\", \"Pool\", \"Basement Rooms\", \"None\"], \"question\": \"Additonal Building Amenities\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(31, 31, 'Elevator Status', '{\"type\": \"dropdown\", \"options\": [\"Available and working full time\", \"Available but off during electricity cuts\", \"Not working\", \"Not available\", \"Under construction\"], \"question\": \"Elevator Status\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(32, 32, 'Number of Elevators in the building', '{\"type\": \"textfield\", \"question\": \"Number of Elevators in the building\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 3, 1),
(33, 33, 'Apartment Floor Level', '{\"type\": \"textfield\", \"question\": \"Apartment Floor Level\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(34, 34, 'Rented Space', '{\"type\": \"dropdown\", \"options\": [\"Room\", \"Apartment\"], \"question\": \"Rented Space\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(35, 35, 'Number of bedrooms in rented aparment', '{\"type\": \"textfield\", \"question\": \"Number of bedrooms in rented aparment\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(36, 36, 'Number of bathrooms in rented aparment', '{\"type\": \"textfield\", \"question\": \"Number of bathrooms in rented aparment\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(37, 37, 'Number of bedrooms in rented Room', '{\"type\": \"textfield\", \"question\": \"Number of bedrooms in rented Room\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(38, 38, 'Private Bathroom?', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\"], \"question\": \"Private Bathroom?\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(39, 39, 'Rented as', '{\"type\": \"dropdown\", \"options\": [\"Furnished\", \"Unfurnished (no Kitchen appliances\", \"Unfurnished (Kitchen appliances)\", \"Semi-furnished\"], \"question\": \"Rented as\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(40, 40, 'Apartment Area (in sqm)', '{\"type\": \"dropdown\", \"options\": [\"0 - 50\", \"51 - 80\", \"81 - 120\", \"121 - 150\", \"151 - 200\", \"201 - 250\", \"251 - 300\", \"301 - 350\", \"351 - 400\", \"401 - 450\", \"451 - 500\", \"501 - 550\", \"551 - 600\", \"601 - 700\", \"more than 700\", \"I don\'t know\"], \"question\": \"Apartment Area (in sqm)\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(41, 41, 'Quality of Bathroom', '{\"type\": \"dropdown\", \"options\": [\"Poor condition\", \"Good condition\", \"New/recently renovated\"], \"question\": \"Quality of Bathroom\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(42, 42, 'Quality of Kitchen', '{\"type\": \"dropdown\", \"options\": [\"Poor condition\", \"Good condition\", \"New/recently renovated\"], \"question\": \"Quality of Kitchen\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(43, 43, 'Humidity and Leaks', '{\"type\": \"dropdown\", \"options\": [\"Humidity\", \"Leaks\", \"Both\", \"None\"], \"question\": \"Humidity and Leaks\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(44, 44, 'Naturally Lit and ventilated', '{\"type\": \"dropdown\", \"options\": [\"All day\", \"Few times during the day\", \"Never\"], \"question\": \"Naturally Lit and ventilated\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(45, 45, 'Dedicated parking spaces', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\", \"Shared Parking\"], \"question\": \"Dedicated parking spaces\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(46, 46, 'if Yes, please specify number of dedicated parking spaces', '{\"type\": \"textfield\", \"question\": \"if Yes, please specify number of dedicated parking spaces\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 4, 1),
(47, 47, 'When did you move into this aparment', '{\"type\": \"date\", \"question\": \"When did you move into this aparment\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 1),
(48, 48, 'When did you last renew your lease?', '{\"type\": \"date\", \"question\": \"When did you last renew your lease?\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 1),
(49, 49, 'Contract/agreement duration (in months)', '{\"type\": \"textfield\", \"question\": \"Contract/agreement duration (in months)\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 1),
(50, 50, 'Value of Rent when you first moved toe the apartment (before renewal of lease agreement) (LBP)', '{\"type\": \"textfield\", \"question\": \"Value of Rent when you first moved toe the apartment (before renewal of lease agreement) (LBP)\", \"researcher_only\": true, \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 0),
(51, 51, 'Contract Type', '{\"type\": \"dropdown\", \"options\": [\"Old rent contract\", \"New rent-recorded at municipality\", \"New rent-written contract\", \"Unrecorded at municipality\", \"Oral contract - unclear terms\"], \"question\": \"Contract Type\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 0),
(52, 52, 'Currency of Rent at time of Agreement', '{\"type\": \"dropdown\", \"options\": [\"USD\", \"LBP\"], \"question\": \"Currency of Rent at time of Agreement\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 0),
(53, 53, 'Current Mode of Payment', '{\"type\": \"dropdown\", \"options\": [\"Cash-through broker\", \"Cash directly\", \"Bank transfer\", \"Cheque\"], \"question\": \"Current Mode of Payment\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 0),
(54, 54, 'Current Payment Currency', '{\"type\": \"dropdown\", \"options\": [\"USD\", \"LBP\"], \"question\": \"Current Payment Currency\", \"user_validation\": \"nullable\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 1),
(55, 55, 'Current Rent Value (in Cash US Dollars)', '{\"type\": \"textfield\", \"question\": \"Current Rent Value (in Cash US Dollars)\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 1),
(56, 56, 'Current Rent Value (in LBP)', '{\"type\": \"textfield\", \"question\": \"Current Rent Value (in LBP)\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 1),
(57, 57, 'Did the Landlord change conditions after 2019 ', '{\"type\": \"checkbox\", \"options\": [\"Yes - raised rent\", \"Yes - changed currency of rent\", \"Yes increates value of ammenties\", \"Requested Rent increase but didn\'t implement\", \"Nothing changed\"], \"question\": \"Did the Landlord change conditions after 2019 \", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 0),
(58, 58, 'Please explain how the landlord changed conditions', '{\"type\": \"textarea\", \"question\": \"Please explain how the landlord changed conditions\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"nullable\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 5, 0),
(59, 59, 'Do you receive support to cover housing cost', '{\"type\": \"dropdown\", \"options\": [\"No\", \"Yes - from a relative\", \"Yes - From an NGO\", \"Yes - from a religious institution\"], \"question\": \"Do you receive support to cover housing cost\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"nullable\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 6, 0),
(60, 60, 'Utilities covered under rent', '{\"type\": \"checkbox\", \"options\": [\"None\", \"Generator Bill\", \"Electricity Bill\", \"Governmental water fees\", \"Building service and cleaning fees\", \"Municipality fees\", \"Internet fees\", \"Other\"], \"question\": \"Utilities covered under rent\", \"user_validation\": \"required\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 6, 0),
(61, 61, 'Do you buy domestic water from private tankers or other suppliers?', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\", \"Only in summer\"], \"question\": \"Do you buy domestic water from private tankers or other suppliers?\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 6, 1),
(62, 62, 'Additional fees (Outside rent)', '{\"type\": \"checkbox\", \"options\": [\"None\", \"Generator Bill\", \"Electricity Bill\", \"Governmental water fees\", \"Building service and cleaning fees\", \"Municipality fees\", \"Internet fees\", \"Other\"], \"question\": \"Additional fees (Outside rent)\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 6, 1),
(63, 63, 'Total monthly payable utility fees (in LBP)', '{\"type\": \"textfield\", \"question\": \"Total monthly payable utility fees (in LBP)\", \"user_validation\": \"required\", \"displayed_in_table\": true, \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 6, 1),
(64, 64, 'Would you like to become an urban homeowner one day?', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\", \"Under certain conditions\", \"Other\"], \"question\": \"Would you like to become an urban homeowner one day?\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 7, 0),
(65, 65, 'Are you happy with your current arrangement', '{\"type\": \"dropdown\", \"options\": [1, 2, 3, 4, 5], \"question\": \"Are you happy with your current arrangement\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 7, 0),
(66, 66, 'Relationship with landlord', '{\"type\": \"dropdown\", \"options\": [1, 2, 3, 4, 5], \"question\": \"Relationship with landlord\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 7, 0),
(67, 67, 'Did you know the landlord before renting the premise', '{\"type\": \"dropdown\", \"options\": [\"Yes\", \"No\", \"Through an acquaintance\"], \"question\": \"Did you know the landlord before renting the premise\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 7, 0),
(68, 68, 'Does the landlord live in the same neighborhood/building', '{\"type\": \"dropdown\", \"options\": [\"Yes - same building\", \"Yes - same neighborhood\", \"No\"], \"question\": \"Does the landlord live in the same neighborhood/building\", \"researcher_only\": true, \"user_validation\": \"nullable\", \"researcher_validation\": \"required\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 7, 0),
(69, 69, 'Your comments', '{\"type\": \"textarea\", \"question\": \"Your comments\", \"user_validation\": \"nullable\", \"researcher_validation\": \"nullable\"}', '2021-08-31 06:47:31', '2021-08-31 06:47:31', 8, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'General Information', '2021-08-31 06:47:31', '2021-08-31 06:47:31'),
(2, 'Household Information', '2021-08-31 06:47:31', '2021-08-31 06:47:31'),
(3, 'Building Information', '2021-08-31 06:47:31', '2021-08-31 06:47:31'),
(4, 'Condition of Rented Space', '2021-08-31 06:47:31', '2021-08-31 06:47:31'),
(5, 'Contract Conditions', '2021-08-31 06:47:31', '2021-08-31 06:47:31'),
(6, 'Cost of Rent', '2021-08-31 06:47:31', '2021-08-31 06:47:31'),
(7, 'Perceptions', '2021-08-31 06:47:31', '2021-08-31 06:47:31'),
(8, 'Additional Information', '2021-08-31 06:47:31', '2021-08-31 06:47:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_verification_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgot_password_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `email_verification_token`, `forgot_password_token`, `mobile`, `firstname`, `lastname`) VALUES
(1, 'joe@yllwdigital.com', '2021-08-04 14:29:04', '$2y$10$g5.qRHk4pqSZV2C7/ej4DuR1NnlxC7u7LQGkRClidJDh55Uz16982', NULL, '2021-08-26 11:28:43', '2021-08-26 11:28:43', '$2y$10$2NbMMiRgVl/7Z7NN6KJUwuRuc6LKRrCWOIOO1ASuXXxRO1nMv0GZO', NULL, '70123123', 'Joe', 'Abdel Sater');

-- --------------------------------------------------------

--
-- Table structure for table `user_submissions`
--

CREATE TABLE `user_submissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `zone_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_submissions`
--

INSERT INTO `user_submissions` (`id`, `user_id`, `pid`, `created_at`, `updated_at`, `zone_id`) VALUES
(4, 1, '37', '2021-08-30 10:20:56', '2021-08-30 10:20:56', 2),
(5, 1, '424', '2021-08-30 10:23:57', '2021-08-30 10:23:57', 2),
(6, 1, '543', '2021-08-30 10:24:00', '2021-08-30 10:24:00', 2),
(7, 1, '861', '2021-08-30 10:24:23', '2021-08-30 10:24:23', 3),
(8, 1, '319', '2021-08-30 10:24:25', '2021-08-30 10:24:25', 3),
(9, 1, '19', '2021-08-30 10:24:33', '2021-08-30 10:24:33', 1),
(10, 1, '434', '2021-08-30 10:24:39', '2021-08-30 10:24:39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_submission_answers`
--

CREATE TABLE `user_submission_answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_submission_id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_submission_answers`
--

INSERT INTO `user_submission_answers` (`id`, `user_submission_id`, `question_id`, `answer`, `created_at`, `updated_at`) VALUES
(1, 4, 1, '5', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(2, 4, 2, '7', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(3, 4, 3, 'all nationalities', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(4, 4, 4, 'Yes', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(5, 4, 7, '2', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(6, 4, 8, '1', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(7, 4, 9, '7', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(8, 4, 10, '5', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(9, 4, 11, '8', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(10, 4, 12, '1', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(11, 4, 13, '8', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(12, 4, 17, '5', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(13, 4, 18, 'Complete', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(14, 4, 19, 'Fair', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(15, 4, 20, '1954 - 1971', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(16, 4, 21, '7', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(17, 4, 22, '4', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(18, 4, 23, '4', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(19, 4, 24, '1', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(20, 4, 25, 'Boom Barrier', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(21, 4, 26, 'Yes', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(22, 4, 27, 'Yes', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(23, 4, 28, 'No', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(24, 4, 29, 'Yes-not-used', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(25, 4, 30, 'Children Playground', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(26, 4, 31, 'Under construction', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(27, 4, 32, '10', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(28, 4, 33, '7', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(29, 4, 34, 'Apartment', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(30, 4, 35, '6', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(31, 4, 36, '6', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(32, 4, 37, '2', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(33, 4, 38, 'Yes', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(34, 4, 39, 'Furnished', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(35, 4, 40, 'mo43 5hqn 700', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(36, 4, 41, 'New/recently renovated', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(37, 4, 42, 'Good condition', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(38, 4, 43, 'Humidity', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(39, 4, 44, 'Few times during the day', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(40, 4, 45, 'Yes', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(41, 4, 46, '8', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(42, 4, 47, '2021-08-13', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(43, 4, 48, '2021-08-03', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(44, 4, 49, '6', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(45, 4, 51, 'New rent-recorded at municipality', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(46, 4, 54, 'LBP', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(47, 4, 55, '11', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(48, 4, 56, '8', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(49, 4, 60, 'None', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(50, 4, 60, 'Generator Bill', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(51, 4, 60, 'Electricity Bill', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(52, 4, 60, 'Governmental water fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(53, 4, 60, 'Building service and cleaning fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(54, 4, 60, 'Municipality fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(55, 4, 60, 'Internet fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(56, 4, 60, 'Other', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(57, 4, 61, 'Only in summer', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(58, 4, 62, 'None', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(59, 4, 62, 'Generator Bill', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(60, 4, 62, 'Electricity Bill', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(61, 4, 62, 'Governmental water fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(62, 4, 62, 'Building service and cleaning fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(63, 4, 62, 'Municipality fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(64, 4, 62, 'Internet fees', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(65, 4, 62, 'Other', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(66, 4, 63, '2', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(67, 4, 69, 'whatever answer', '2021-08-30 10:20:56', '2021-08-30 10:20:56'),
(68, 5, 1, '5', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(69, 5, 2, '7', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(70, 5, 3, 'all nationalities', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(71, 5, 4, 'Yes', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(72, 5, 7, '2', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(73, 5, 8, '1', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(74, 5, 9, '7', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(75, 5, 10, '5', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(76, 5, 11, '8', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(77, 5, 12, '1', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(78, 5, 13, '8', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(79, 5, 17, '5', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(80, 5, 18, 'Complete', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(81, 5, 19, 'Fair', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(82, 5, 20, '1954 - 1971', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(83, 5, 21, '7', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(84, 5, 22, '4', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(85, 5, 23, '4', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(86, 5, 24, '1', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(87, 5, 25, 'Boom Barrier', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(88, 5, 26, 'Yes', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(89, 5, 27, 'Yes', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(90, 5, 28, 'No', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(91, 5, 29, 'Yes-not-used', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(92, 5, 30, 'Children Playground', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(93, 5, 31, 'Under construction', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(94, 5, 32, '10', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(95, 5, 33, '7', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(96, 5, 34, 'Apartment', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(97, 5, 35, '6', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(98, 5, 36, '6', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(99, 5, 37, '2', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(100, 5, 38, 'Yes', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(101, 5, 39, 'Furnished', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(102, 5, 40, 'mo43 5hqn 700', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(103, 5, 41, 'New/recently renovated', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(104, 5, 42, 'Good condition', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(105, 5, 43, 'Humidity', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(106, 5, 44, 'Few times during the day', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(107, 5, 45, 'Yes', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(108, 5, 46, '8', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(109, 5, 47, '2021-08-13', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(110, 5, 48, '2021-08-03', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(111, 5, 49, '6', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(112, 5, 51, 'New rent-recorded at municipality', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(113, 5, 54, 'LBP', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(114, 5, 55, '11', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(115, 5, 56, '8', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(116, 5, 60, 'None', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(117, 5, 60, 'Generator Bill', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(118, 5, 60, 'Electricity Bill', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(119, 5, 60, 'Governmental water fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(120, 5, 60, 'Building service and cleaning fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(121, 5, 60, 'Municipality fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(122, 5, 60, 'Internet fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(123, 5, 60, 'Other', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(124, 5, 61, 'Only in summer', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(125, 5, 62, 'None', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(126, 5, 62, 'Generator Bill', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(127, 5, 62, 'Electricity Bill', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(128, 5, 62, 'Governmental water fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(129, 5, 62, 'Building service and cleaning fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(130, 5, 62, 'Municipality fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(131, 5, 62, 'Internet fees', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(132, 5, 62, 'Other', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(133, 5, 63, '2', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(134, 5, 69, 'whatever answer', '2021-08-30 10:23:57', '2021-08-30 10:23:57'),
(135, 6, 1, '5', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(136, 6, 2, '7', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(137, 6, 3, 'all nationalities', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(138, 6, 4, 'Yes', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(139, 6, 7, '2', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(140, 6, 8, '1', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(141, 6, 9, '7', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(142, 6, 10, '5', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(143, 6, 11, '8', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(144, 6, 12, '1', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(145, 6, 13, '8', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(146, 6, 17, '5', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(147, 6, 18, 'Complete', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(148, 6, 19, 'Fair', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(149, 6, 20, '1954 - 1971', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(150, 6, 21, '7', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(151, 6, 22, '4', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(152, 6, 23, '4', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(153, 6, 24, '1', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(154, 6, 25, 'Boom Barrier', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(155, 6, 26, 'Yes', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(156, 6, 27, 'Yes', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(157, 6, 28, 'No', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(158, 6, 29, 'Yes-not-used', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(159, 6, 30, 'Children Playground', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(160, 6, 31, 'Under construction', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(161, 6, 32, '10', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(162, 6, 33, '7', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(163, 6, 34, 'Apartment', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(164, 6, 35, '6', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(165, 6, 36, '6', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(166, 6, 37, '2', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(167, 6, 38, 'Yes', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(168, 6, 39, 'Furnished', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(169, 6, 40, 'mo43 5hqn 700', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(170, 6, 41, 'New/recently renovated', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(171, 6, 42, 'Good condition', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(172, 6, 43, 'Humidity', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(173, 6, 44, 'Few times during the day', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(174, 6, 45, 'Yes', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(175, 6, 46, '8', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(176, 6, 47, '2021-08-13', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(177, 6, 48, '2021-08-03', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(178, 6, 49, '6', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(179, 6, 51, 'New rent-recorded at municipality', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(180, 6, 54, 'LBP', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(181, 6, 55, '11', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(182, 6, 56, '8', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(183, 6, 60, 'None', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(184, 6, 60, 'Generator Bill', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(185, 6, 60, 'Electricity Bill', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(186, 6, 60, 'Governmental water fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(187, 6, 60, 'Building service and cleaning fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(188, 6, 60, 'Municipality fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(189, 6, 60, 'Internet fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(190, 6, 60, 'Other', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(191, 6, 61, 'Only in summer', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(192, 6, 62, 'None', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(193, 6, 62, 'Generator Bill', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(194, 6, 62, 'Electricity Bill', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(195, 6, 62, 'Governmental water fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(196, 6, 62, 'Building service and cleaning fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(197, 6, 62, 'Municipality fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(198, 6, 62, 'Internet fees', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(199, 6, 62, 'Other', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(200, 6, 63, '2', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(201, 6, 69, 'whatever answer', '2021-08-30 10:24:00', '2021-08-30 10:24:00'),
(202, 7, 1, '7', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(203, 7, 2, '3', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(204, 7, 3, 'all nationalities', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(205, 7, 4, 'Yes', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(206, 7, 7, '1', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(207, 7, 8, '8', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(208, 7, 9, '5', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(209, 7, 10, '4', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(210, 7, 11, '4', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(211, 7, 12, '2', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(212, 7, 13, '3', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(213, 7, 17, '8', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(214, 7, 18, 'Incomplete', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(215, 7, 19, 'Dilapidated', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(216, 7, 20, '1972 - 1983', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(217, 7, 21, '9', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(218, 7, 22, '3', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(219, 7, 23, '7', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(220, 7, 24, '5', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(221, 7, 25, 'No Gate', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(222, 7, 26, 'Yes', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(223, 7, 27, 'Yes', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(224, 7, 28, 'Yes', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(225, 7, 29, 'Yes-Saline-used', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(226, 7, 30, 'Pool', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(227, 7, 31, 'Available and working full time', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(228, 7, 32, '1', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(229, 7, 33, '5', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(230, 7, 34, 'Room', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(231, 7, 35, '10', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(232, 7, 36, '6', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(233, 7, 37, '5', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(234, 7, 38, 'No', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(235, 7, 39, 'Unfurnished (no Kitchen appliances', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(236, 7, 40, '51 - 80', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(237, 7, 41, 'New/recently renovated', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(238, 7, 42, 'Good condition', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(239, 7, 43, 'Both', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(240, 7, 44, 'Never', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(241, 7, 45, 'No', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(242, 7, 46, '5', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(243, 7, 47, '2021-08-20', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(244, 7, 48, '2021-08-19', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(245, 7, 49, '4', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(246, 7, 51, 'Oral contract - unclear terms', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(247, 7, 54, 'USD', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(248, 7, 55, '9', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(249, 7, 56, '11', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(250, 7, 60, 'None', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(251, 7, 60, 'Generator Bill', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(252, 7, 60, 'Electricity Bill', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(253, 7, 60, 'Governmental water fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(254, 7, 60, 'Building service and cleaning fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(255, 7, 60, 'Municipality fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(256, 7, 60, 'Internet fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(257, 7, 60, 'Other', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(258, 7, 61, 'No', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(259, 7, 62, 'None', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(260, 7, 62, 'Generator Bill', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(261, 7, 62, 'Electricity Bill', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(262, 7, 62, 'Governmental water fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(263, 7, 62, 'Building service and cleaning fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(264, 7, 62, 'Municipality fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(265, 7, 62, 'Internet fees', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(266, 7, 62, 'Other', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(267, 7, 63, '9', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(268, 7, 69, 'whatever answer', '2021-08-30 10:24:23', '2021-08-30 10:24:23'),
(269, 8, 1, '7', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(270, 8, 2, '3', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(271, 8, 3, 'all nationalities', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(272, 8, 4, 'Yes', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(273, 8, 7, '1', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(274, 8, 8, '8', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(275, 8, 9, '5', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(276, 8, 10, '4', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(277, 8, 11, '4', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(278, 8, 12, '2', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(279, 8, 13, '3', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(280, 8, 17, '8', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(281, 8, 18, 'Incomplete', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(282, 8, 19, 'Dilapidated', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(283, 8, 20, '1972 - 1983', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(284, 8, 21, '9', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(285, 8, 22, '3', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(286, 8, 23, '7', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(287, 8, 24, '5', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(288, 8, 25, 'No Gate', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(289, 8, 26, 'Yes', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(290, 8, 27, 'Yes', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(291, 8, 28, 'Yes', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(292, 8, 29, 'Yes-Saline-used', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(293, 8, 30, 'Pool', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(294, 8, 31, 'Available and working full time', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(295, 8, 32, '1', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(296, 8, 33, '5', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(297, 8, 34, 'Room', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(298, 8, 35, '10', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(299, 8, 36, '6', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(300, 8, 37, '5', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(301, 8, 38, 'No', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(302, 8, 39, 'Unfurnished (no Kitchen appliances', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(303, 8, 40, '51 - 80', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(304, 8, 41, 'New/recently renovated', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(305, 8, 42, 'Good condition', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(306, 8, 43, 'Both', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(307, 8, 44, 'Never', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(308, 8, 45, 'No', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(309, 8, 46, '5', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(310, 8, 47, '2021-08-20', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(311, 8, 48, '2021-08-19', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(312, 8, 49, '4', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(313, 8, 51, 'Oral contract - unclear terms', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(314, 8, 54, 'USD', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(315, 8, 55, '9', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(316, 8, 56, '11', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(317, 8, 60, 'None', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(318, 8, 60, 'Generator Bill', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(319, 8, 60, 'Electricity Bill', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(320, 8, 60, 'Governmental water fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(321, 8, 60, 'Building service and cleaning fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(322, 8, 60, 'Municipality fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(323, 8, 60, 'Internet fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(324, 8, 60, 'Other', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(325, 8, 61, 'No', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(326, 8, 62, 'None', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(327, 8, 62, 'Generator Bill', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(328, 8, 62, 'Electricity Bill', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(329, 8, 62, 'Governmental water fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(330, 8, 62, 'Building service and cleaning fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(331, 8, 62, 'Municipality fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(332, 8, 62, 'Internet fees', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(333, 8, 62, 'Other', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(334, 8, 63, '9', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(335, 8, 69, 'whatever answer', '2021-08-30 10:24:25', '2021-08-30 10:24:25'),
(336, 9, 1, '7', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(337, 9, 2, '3', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(338, 9, 3, 'all nationalities', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(339, 9, 4, 'Yes', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(340, 9, 7, '1', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(341, 9, 8, '8', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(342, 9, 9, '5', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(343, 9, 10, '4', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(344, 9, 11, '4', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(345, 9, 12, '2', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(346, 9, 13, '3', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(347, 9, 17, '8', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(348, 9, 18, 'Incomplete', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(349, 9, 19, 'Dilapidated', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(350, 9, 20, '1972 - 1983', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(351, 9, 21, '9', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(352, 9, 22, '3', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(353, 9, 23, '7', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(354, 9, 24, '5', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(355, 9, 25, 'No Gate', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(356, 9, 26, 'Yes', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(357, 9, 27, 'Yes', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(358, 9, 28, 'Yes', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(359, 9, 29, 'Yes-Saline-used', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(360, 9, 30, 'Pool', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(361, 9, 31, 'Available and working full time', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(362, 9, 32, '1', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(363, 9, 33, '5', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(364, 9, 34, 'Room', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(365, 9, 35, '10', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(366, 9, 36, '6', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(367, 9, 37, '5', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(368, 9, 38, 'No', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(369, 9, 39, 'Unfurnished (no Kitchen appliances', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(370, 9, 40, '51 - 80', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(371, 9, 41, 'New/recently renovated', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(372, 9, 42, 'Good condition', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(373, 9, 43, 'Both', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(374, 9, 44, 'Never', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(375, 9, 45, 'No', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(376, 9, 46, '5', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(377, 9, 47, '2021-08-20', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(378, 9, 48, '2021-08-19', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(379, 9, 49, '4', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(380, 9, 51, 'Oral contract - unclear terms', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(381, 9, 54, 'USD', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(382, 9, 55, '9', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(383, 9, 56, '11', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(384, 9, 60, 'None', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(385, 9, 60, 'Generator Bill', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(386, 9, 60, 'Electricity Bill', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(387, 9, 60, 'Governmental water fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(388, 9, 60, 'Building service and cleaning fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(389, 9, 60, 'Municipality fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(390, 9, 60, 'Internet fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(391, 9, 60, 'Other', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(392, 9, 61, 'No', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(393, 9, 62, 'None', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(394, 9, 62, 'Generator Bill', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(395, 9, 62, 'Electricity Bill', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(396, 9, 62, 'Governmental water fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(397, 9, 62, 'Building service and cleaning fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(398, 9, 62, 'Municipality fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(399, 9, 62, 'Internet fees', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(400, 9, 62, 'Other', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(401, 9, 63, '9', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(402, 9, 69, 'whatever answer', '2021-08-30 10:24:33', '2021-08-30 10:24:33'),
(403, 10, 1, '7', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(404, 10, 2, '3', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(405, 10, 3, 'all nationalities', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(406, 10, 4, 'Yes', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(407, 10, 7, '1', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(408, 10, 8, '8', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(409, 10, 9, '5', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(410, 10, 10, '4', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(411, 10, 11, '4', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(412, 10, 12, '2', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(413, 10, 13, '3', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(414, 10, 17, '8', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(415, 10, 18, 'Incomplete', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(416, 10, 19, 'Dilapidated', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(417, 10, 20, '1972 - 1983', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(418, 10, 21, '9', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(419, 10, 22, '3', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(420, 10, 23, '7', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(421, 10, 24, '5', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(422, 10, 25, 'No Gate', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(423, 10, 26, 'Yes', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(424, 10, 27, 'Yes', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(425, 10, 28, 'Yes', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(426, 10, 29, 'Yes-Saline-used', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(427, 10, 30, 'Pool', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(428, 10, 31, 'Available and working full time', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(429, 10, 32, '1', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(430, 10, 33, '5', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(431, 10, 34, 'Room', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(432, 10, 35, '10', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(433, 10, 36, '6', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(434, 10, 37, '5', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(435, 10, 38, 'No', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(436, 10, 39, 'Unfurnished (no Kitchen appliances', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(437, 10, 40, '51 - 80', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(438, 10, 41, 'New/recently renovated', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(439, 10, 42, 'Good condition', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(440, 10, 43, 'Both', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(441, 10, 44, 'Never', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(442, 10, 45, 'No', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(443, 10, 46, '5', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(444, 10, 47, '2021-08-20', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(445, 10, 48, '2021-08-19', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(446, 10, 49, '4', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(447, 10, 51, 'Oral contract - unclear terms', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(448, 10, 54, 'USD', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(449, 10, 55, '9', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(450, 10, 56, '11', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(451, 10, 60, 'None', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(452, 10, 60, 'Generator Bill', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(453, 10, 60, 'Electricity Bill', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(454, 10, 60, 'Governmental water fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(455, 10, 60, 'Building service and cleaning fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(456, 10, 60, 'Municipality fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(457, 10, 60, 'Internet fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(458, 10, 60, 'Other', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(459, 10, 61, 'No', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(460, 10, 62, 'None', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(461, 10, 62, 'Generator Bill', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(462, 10, 62, 'Electricity Bill', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(463, 10, 62, 'Governmental water fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(464, 10, 62, 'Building service and cleaning fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(465, 10, 62, 'Municipality fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(466, 10, 62, 'Internet fees', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(467, 10, 62, 'Other', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(468, 10, 63, '9', '2021-08-30 10:24:39', '2021-08-30 10:24:39'),
(469, 10, 69, 'whatever answer', '2021-08-30 10:24:39', '2021-08-30 10:24:39');

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE `zones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `arcgis_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`id`, `name`, `arcgis_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'zone 1', 'zone1', NULL, NULL, NULL),
(2, 'zone2 ', 'zone2', NULL, NULL, NULL),
(3, 'zone3', 'zone3', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_section_id_foreign` (`section_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_submissions`
--
ALTER TABLE `user_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_submissions_user_id_foreign` (`user_id`),
  ADD KEY `user_submissions_zone_id_foreign` (`zone_id`);

--
-- Indexes for table `user_submission_answers`
--
ALTER TABLE `user_submission_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_submission_answers_user_submission_id_foreign` (`user_submission_id`),
  ADD KEY `user_submission_answers_question_id_foreign` (`question_id`);

--
-- Indexes for table `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_submissions`
--
ALTER TABLE `user_submissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_submission_answers`
--
ALTER TABLE `user_submission_answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=470;

--
-- AUTO_INCREMENT for table `zones`
--
ALTER TABLE `zones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_submissions`
--
ALTER TABLE `user_submissions`
  ADD CONSTRAINT `user_submissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_submissions_zone_id_foreign` FOREIGN KEY (`zone_id`) REFERENCES `zones` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_submission_answers`
--
ALTER TABLE `user_submission_answers`
  ADD CONSTRAINT `user_submission_answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_submission_answers_user_submission_id_foreign` FOREIGN KEY (`user_submission_id`) REFERENCES `user_submissions` (`id`) ON DELETE CASCADE;
