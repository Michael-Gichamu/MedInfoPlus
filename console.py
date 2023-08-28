#!/usr/bin/python3
""" Console """

import cmd
from datetime import datetime
import models
from models.base_model import BaseModel
from models.medical_article import MedicalArticle
from models.resource import Resource
import shlex

classes = {"MedicalArticle": MedicalArticle, "Resource": Resource}


class MedInfoPlusCommand(cmd.Cmd):
    """ MedInfoPlus console """
    prompt = '(MedInfoPlus) '

    def do_EOF(self, arg):
        """Exits console"""
        return True

    def emptyline(self):
        """ overwriting the emptyline method """
        return False

    def do_quit(self, arg):
        """Quit command to exit the program"""
        return True
    def _key_value_parser(self, args):
        """creates a dictionary from a list of strings"""
        new_dict = {}
        current_key = None
        for arg in args:
            if "=" in arg:
                key, value = arg.split("=", 1)
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                new_dict[key] = value
            else:
                if current_key is not None:
                    new_dict[current_key] += f" {arg}"
            current_key = key
        return new_dict

    def do_create(self, arg):
        """Creates a new instance of a class"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            new_dict = self._key_value_parser(args[1:])
            instance = classes[args[0]](**new_dict)
        else:
            print("** class doesn't exist **")
            return False
        print(instance.id)
        instance.save()

    def do_show(self, arg):
        """Prints an instance as a string based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            if len(args) > 1:
                key = args[0] + "." + args[1]
                if key in models.storage.all():
                    print(models.storage.all()[key])
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")

    def do_destroy(self, arg):
        """Deletes an instance based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            class_name = args[0]
            if len(args) > 1:
                instance_id = args[1]
                key = f"{class_name}.{instance_id}"
                if key in models.storage.all():
                    instance = models.storage.all()[key]
                    models.storage.delete(instance)
                    models.storage.save()
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")


    def do_all(self, arg):
        """Prints string representations of instances"""
        args = shlex.split(arg)
        obj_list = []
        if len(args) == 0:
            obj_dict = models.storage.all()
        elif args[0] in classes:
            obj_dict = models.storage.all(classes[args[0]])
        else:
            print("** class doesn't exist **")
            return False
        for key in obj_dict:
            obj_list.append(str(obj_dict[key]))
        print("[", end="")
        print(", ".join(obj_list), end="")
        print("]")

    def do_update(self, arg):
        """Updates an instance based on the class name and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
            return
        if args[0] not in classes:
            print("** class doesn't exist **")
            return
        if len(args) < 2:
            print("** instance id missing **")
            return
        key = args[0] + "." + args[1]
        if key not in models.storage.all():
            print("** no instance found **")
            return

        instance = models.storage.all()[key]
        if len(args) < 3:
            print("** attribute name missing **")
            return
        if len(args) < 4:
            print("** value missing **")
            return

        attribute_name = args[2]
        value = args[3]
        if hasattr(instance, attribute_name):
            try:
                value = int(value)
            except ValueError:
                try:
                    value = float(value)
                except ValueError:
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
            setattr(instance, attribute_name, value)
            instance.save()
        else:
            print("** attribute doesn't exist **")


if __name__ == '__main__':
    MedInfoPlusCommand().cmdloop()
