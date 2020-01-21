[![Flutter Extensions](https://img.shields.io/badge/Flutter-grey?style=flat&logo=flutter&logoColor=blue)](https://flutter.dev)
[![GitHub](https://img.shields.io/github/license/kuroshmondora/flutter-mvc-generator-vs-code-extension?color=blue&style=flat)](LICENSE)

# Flutter MVC Architecture Generator [![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Kurosh.flutter-mvc-generator?style=flat)](https://marketplace.visualstudio.com/items?itemName=Kurosh.flutter-mvc-generator)

VsCode extension to generate boilerplate code when using using [providers](https://pub.dev/packages/provider)

## Features

### Create MVC

The create MVC command or menu will add a **MVC**.

![Create MVC command](images/mvc_command.gif)

![Create MVC menu](images/mvc_menu.gif)

![MVC Structure](images/mvc.png)

#### Example

If you give parameter for class name as `home`, the extension will create a directory structure like this

```bash
--root
    |-- android
    |-- ios
    |-- lib
        |-- models
            |-- home
                |-- home_model.dart
        |-- views
            |-- home
                |-- home_view.dart
        |-- controllers
            |-- home
                |-- home_controller.dart
        |-- main.dart
    |-- test
    |-- pubspec.yaml
```

It will also add the following dependencies to the `pubspec.yaml` file

- provider: ^4.0.2

### Create Model

The create model command or menu will add a **Model**.

![Create Model command](images/model_command.gif)

![Create Model menu](images/model_menu.gif)

#### Example

If you give parameter for class name as `home`, the extension will create a directory structure like this

```bash
--root
    |-- android
    |-- ios
    |-- lib
        |-- models
            |-- home
                |-- home_model.dart
        |-- main.dart
    |-- test
    |-- pubspec.yaml
```

It will also add the following dependencies to the `pubspec.yaml` file

- provider: ^4.0.2

### Create View

The create view command or menu will add a **View**.

![Create View command](images/view_command.gif)

![Create View menu](images/view_menu.gif)

#### Example

If you give parameter for class name as `home`, the extension will create a directory structure like this

```bash
--root
    |-- android
    |-- ios
    |-- lib
        |-- views
            |-- home
                |-- home_view.dart
        |-- main.dart
    |-- test
    |-- pubspec.yaml
```

It will also add the following dependencies to the `pubspec.yaml` file

- provider: ^4.0.2

### Create Controller

The create controller command or menu will add a **Controller**.

![Create Controller command](images/controller_command.gif)

![Create Controller menu](images/controller_menu.gif)

#### Example

If you give parameter for class name as `home`, the extension will create a directory structure like this

```bash
--root
    |-- android
    |-- ios
    |-- lib
        |-- controllers
            |-- home
                |-- home_controller.dart
        |-- main.dart
    |-- test
    |-- pubspec.yaml
```

It will also add the following dependencies to the `pubspec.yaml` file

- provider: ^4.0.2
