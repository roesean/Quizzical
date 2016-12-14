
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 11/15/2016 15:50:51
-- Generated from EDMX file: C:\Users\SeanRoe\Source\Repos\Neil\Project 2 - Quiz App\QuizLibrary\QuizLibrary\QuizModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [QuizDatabase];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_QuizQuestion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Questions] DROP CONSTRAINT [FK_QuizQuestion];
GO
IF OBJECT_ID(N'[dbo].[FK_QuestionAnswer]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Answers] DROP CONSTRAINT [FK_QuestionAnswer];
GO
IF OBJECT_ID(N'[dbo].[FK_UserQuizRun]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuizRuns] DROP CONSTRAINT [FK_UserQuizRun];
GO
IF OBJECT_ID(N'[dbo].[FK_QuizRunQuiz]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuizRuns] DROP CONSTRAINT [FK_QuizRunQuiz];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Users];
GO
IF OBJECT_ID(N'[dbo].[Quizs]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Quizs];
GO
IF OBJECT_ID(N'[dbo].[Questions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Questions];
GO
IF OBJECT_ID(N'[dbo].[Answers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Answers];
GO
IF OBJECT_ID(N'[dbo].[QuizRuns]', 'U') IS NOT NULL
    DROP TABLE [dbo].[QuizRuns];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserName] nvarchar(max)  NOT NULL,
    [Password] nvarchar(max)  NOT NULL,
    [AvgScore] decimal(18,2)  NOT NULL,
    [TotalQuizzes] smallint  NOT NULL
);
GO

-- Creating table 'Quizs'
CREATE TABLE [dbo].[Quizs] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Questions'
CREATE TABLE [dbo].[Questions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CorrectAnswer] nvarchar(max)  NOT NULL,
    [Text] nvarchar(max)  NOT NULL,
    [QuizId] int  NOT NULL
);
GO

-- Creating table 'Answers'
CREATE TABLE [dbo].[Answers] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Text] nvarchar(max)  NOT NULL,
    [QuestionId] int  NOT NULL
);
GO

-- Creating table 'QuizRuns'
CREATE TABLE [dbo].[QuizRuns] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Score] decimal(18,2)  NOT NULL,
    [DateTaken] datetime  NOT NULL,
    [UserId] int  NOT NULL,
    [Quiz_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Quizs'
ALTER TABLE [dbo].[Quizs]
ADD CONSTRAINT [PK_Quizs]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Questions'
ALTER TABLE [dbo].[Questions]
ADD CONSTRAINT [PK_Questions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Answers'
ALTER TABLE [dbo].[Answers]
ADD CONSTRAINT [PK_Answers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'QuizRuns'
ALTER TABLE [dbo].[QuizRuns]
ADD CONSTRAINT [PK_QuizRuns]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [QuizId] in table 'Questions'
ALTER TABLE [dbo].[Questions]
ADD CONSTRAINT [FK_QuizQuestion]
    FOREIGN KEY ([QuizId])
    REFERENCES [dbo].[Quizs]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuizQuestion'
CREATE INDEX [IX_FK_QuizQuestion]
ON [dbo].[Questions]
    ([QuizId]);
GO

-- Creating foreign key on [QuestionId] in table 'Answers'
ALTER TABLE [dbo].[Answers]
ADD CONSTRAINT [FK_QuestionAnswer]
    FOREIGN KEY ([QuestionId])
    REFERENCES [dbo].[Questions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuestionAnswer'
CREATE INDEX [IX_FK_QuestionAnswer]
ON [dbo].[Answers]
    ([QuestionId]);
GO

-- Creating foreign key on [UserId] in table 'QuizRuns'
ALTER TABLE [dbo].[QuizRuns]
ADD CONSTRAINT [FK_UserQuizRun]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserQuizRun'
CREATE INDEX [IX_FK_UserQuizRun]
ON [dbo].[QuizRuns]
    ([UserId]);
GO

-- Creating foreign key on [Quiz_Id] in table 'QuizRuns'
ALTER TABLE [dbo].[QuizRuns]
ADD CONSTRAINT [FK_QuizRunQuiz]
    FOREIGN KEY ([Quiz_Id])
    REFERENCES [dbo].[Quizs]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuizRunQuiz'
CREATE INDEX [IX_FK_QuizRunQuiz]
ON [dbo].[QuizRuns]
    ([Quiz_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------