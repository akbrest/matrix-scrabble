USE [Scrabble]
GO
/****** Object:  Table [dbo].[Game]    Script Date: 2024-02-11 19:45:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Game](
	[language] [nvarchar](max) NULL,
	[game] [nvarchar](max) NULL,
	[is_completed] [bit] NULL,
	[word] [nvarchar](50) NULL,
	[date_created] [datetime] NULL,
	[id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Game] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GameHistory]    Script Date: 2024-02-11 19:45:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GameHistory](
	[game] [nvarchar](max) NULL,
	[date_created] [datetime] NULL,
	[game_id] [uniqueidentifier] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 2024-02-11 19:45:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[name] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[date_created] [datetime] NULL,
	[id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'град', CAST(N'2024-02-11T14:17:11.040' AS DateTime), N'b1b4bdde-e2be-4d35-bb0a-1139fd6b15c9')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T00:54:22.063' AS DateTime), N'b99ab946-64c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:41.627' AS DateTime), N'3cc9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:42.887' AS DateTime), N'3dc9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:43.503' AS DateTime), N'3ec9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:44.000' AS DateTime), N'3fc9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:44.263' AS DateTime), N'41c9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'string', CAST(N'2024-02-11T02:51:44.383' AS DateTime), N'42c9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:44.530' AS DateTime), N'43c9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:44.660' AS DateTime), N'44c9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', NULL, 0, N'колбаса', CAST(N'2024-02-11T02:51:44.807' AS DateTime), N'45c9dab7-77c8-ee11-93bb-18cc18d38154')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'{"ID":"b00ff449-83c2-4136-b64a-1a87350d0b04","Left":[],"Board":[],"Right":[]}', 1, N'блог', CAST(N'2024-02-11T17:12:17.673' AS DateTime), N'b00ff449-83c2-4136-b64a-1a87350d0b04')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'фарт', CAST(N'2024-02-11T17:28:44.567' AS DateTime), N'ec630521-7ad5-4eb7-ac40-1dc27644d53e')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'бог', CAST(N'2024-02-11T17:06:56.717' AS DateTime), N'72f3aaaa-8c84-4daf-9602-1ef750a227d6')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'{"ID":"d7524603-b2d6-4d82-9a2b-229b8e6ea297","Left":["","\u0430\u0430","\u0430",""],"Board":[["",""],["","\u0430"],["",""],["",""]],"Right":["","\u0430\u0430","\u0430",""]}', 1, N'', CAST(N'2024-02-11T17:29:37.307' AS DateTime), N'd7524603-b2d6-4d82-9a2b-229b8e6ea297')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'фарт', CAST(N'2024-02-11T17:02:56.220' AS DateTime), N'0178c2e0-c01f-401b-a8b1-28bd50f3cca4')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'string', N'', 0, N'string', CAST(N'2024-02-11T00:52:36.983' AS DateTime), N'7ce11f61-bd52-451e-8390-29ea862c7ab0')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'дом', CAST(N'2024-02-11T15:01:55.683' AS DateTime), N'b1a77489-5988-41e1-91c8-2fae3b4d06ed')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'блог', CAST(N'2024-02-11T14:57:17.190' AS DateTime), N'4e6e726b-6434-494b-95ab-307c41351eef')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'дом', CAST(N'2024-02-11T15:01:36.457' AS DateTime), N'6813a5fe-998e-49b4-9db4-3398f06ca6de')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'кран', CAST(N'2024-02-11T17:27:29.373' AS DateTime), N'c30ffdcf-1f24-4a3f-a3c8-358e3f0aa2dd')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'дом', CAST(N'2024-02-11T14:37:08.087' AS DateTime), N'9e54d28e-1045-48c9-a4a1-35e6cfa3c44f')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'град', CAST(N'2024-02-11T14:33:27.993' AS DateTime), N'e000e076-5e07-4ea6-a5c8-37ffd128733b')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'кран', CAST(N'2024-02-11T17:18:21.913' AS DateTime), N'10905f6c-dd8f-4c93-a3a9-458099a6b037')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'блог', CAST(N'2024-02-11T14:25:31.770' AS DateTime), N'e1b0d7af-074a-458d-9881-465b74dd6e33')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'{"ID":"5313af56-397b-46d8-988f-4bc0f8950fda","Left":[],"Board":[],"Right":[]}', 1, N'фарт', CAST(N'2024-02-11T17:17:28.557' AS DateTime), N'5313af56-397b-46d8-988f-4bc0f8950fda')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'фон', CAST(N'2024-02-11T14:56:58.133' AS DateTime), N'3f5dfe37-1420-4138-aca3-54aae5840782')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'бог', CAST(N'2024-02-11T17:08:02.637' AS DateTime), N'68d49ace-57ab-4f9e-845f-5d5b7471931a')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'клад', CAST(N'2024-02-11T14:39:57.350' AS DateTime), N'6cbc6db7-e9ce-4d90-90af-628bcebc9761')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'{"ID":"4cef7e13-54ee-4421-a0be-6553c16effac","Left":["","","\u0432",""],"Board":[["",""],["",""],["",""],["",""]],"Right":["","","\u0430",""]}', 1, N'клад', CAST(N'2024-02-11T17:09:29.550' AS DateTime), N'4cef7e13-54ee-4421-a0be-6553c16effac')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'град', CAST(N'2024-02-11T17:21:38.233' AS DateTime), N'9fe1e2f6-ffda-4566-a30d-667f1c34c663')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'клад', CAST(N'2024-02-11T14:50:57.500' AS DateTime), N'c575ec7a-d199-43ca-adf5-79a70ebea4a3')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'кран', CAST(N'2024-02-11T17:14:55.840' AS DateTime), N'2418c785-99b6-4d40-a7bc-7b083de64681')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'клад', CAST(N'2024-02-11T17:28:04.180' AS DateTime), N'eed493d0-adae-41fb-b0d8-87ff8a0950ed')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'бог', CAST(N'2024-02-11T15:03:03.693' AS DateTime), N'2f4b405b-ffb5-423e-8b78-a351abdcc067')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'град', CAST(N'2024-02-11T17:02:36.883' AS DateTime), N'a3805a02-764b-41d7-8dc8-a7f81ca3878a')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'бог', CAST(N'2024-02-11T14:40:40.800' AS DateTime), N'aef54c71-702f-49c5-93dc-b5cdc20361cb')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'блог', CAST(N'2024-02-11T14:57:38.147' AS DateTime), N'5e0fdeee-5aae-49db-aed4-b8322e3f2fdb')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'клад', CAST(N'2024-02-11T17:05:47.990' AS DateTime), N'4a713c60-15f8-4971-b8b7-bb2d865ddbf9')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'фарт', CAST(N'2024-02-11T14:47:54.277' AS DateTime), N'a0a73941-5ccf-48eb-b031-bf02f3f3131f')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'блог', CAST(N'2024-02-11T14:49:40.010' AS DateTime), N'967c8577-5e4a-48b7-aa8c-c57104e21ed0')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'фарт', CAST(N'2024-02-11T14:59:30.030' AS DateTime), N'22bcd05f-fbdb-40cc-9340-cebd8e99f632')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'фарт', CAST(N'2024-02-11T14:56:43.097' AS DateTime), N'f8e5a330-530b-4b90-81b2-df3d1c8731ca')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'{"ID":null,"Left":["\u0430\u0430\u0430","",""],"Board":[["\u0430"],["\u0432"],[""]],"Right":["\u0430\u0430\u0430","\u0430",""]}', 1, N'кран', CAST(N'2024-02-11T14:03:00.113' AS DateTime), N'4a9d9685-6934-4d14-b840-e7dc594450fd')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'клад', CAST(N'2024-02-11T14:51:23.223' AS DateTime), N'957acc04-b9aa-4183-8526-e87244c061a4')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'блог', CAST(N'2024-02-11T14:54:27.720' AS DateTime), N'0335886f-b462-46e5-8cfb-ec4020675eed')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'мир', CAST(N'2024-02-11T14:43:30.047' AS DateTime), N'eb30b949-058e-4bf6-82c6-ede29b86e97e')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'град', CAST(N'2024-02-11T17:11:11.480' AS DateTime), N'a64111d4-8f28-4e44-9cef-f14f134ed2a0')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'фарт', CAST(N'2024-02-11T14:35:51.337' AS DateTime), N'f60833df-fec5-4d05-af50-f24bc6cc329a')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'бог', CAST(N'2024-02-11T15:05:01.807' AS DateTime), N'7748a80c-0a54-4590-8a55-f751198a51ed')
INSERT [dbo].[Game] ([language], [game], [is_completed], [word], [date_created], [id]) VALUES (N'ru', N'', 0, N'бог', CAST(N'2024-02-11T15:02:32.810' AS DateTime), N'f927f368-7b73-4e70-b135-fd41ff184515')
GO
INSERT [dbo].[User] ([name], [email], [date_created], [id]) VALUES (N'Aliaksandr', N'aaa@gmail.com', CAST(N'2024-02-11T19:39:08.960' AS DateTime), N'93b34575-04c9-ee11-93bb-18cc18d38154')
INSERT [dbo].[User] ([name], [email], [date_created], [id]) VALUES (N'Vadim', N'vadste@gmail.com', CAST(N'2024-02-11T19:39:15.867' AS DateTime), N'94b34575-04c9-ee11-93bb-18cc18d38154')
GO
ALTER TABLE [dbo].[Game] ADD  CONSTRAINT [DF__Game__id__35BCFE0A]  DEFAULT (newsequentialid()) FOR [id]
GO
